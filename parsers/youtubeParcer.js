const puppeteer = require('puppeteer')
const {PARSE_CONNECTION} = require('../Classes/Connection');
const {LinkQueue} = require("../Classes/Queue");
const Dump = require("../Classes/Dump");


const youtubeParcer = async () => {
    setInterval(async () => {
        try {
            if (LinkQueue.any()&& Dump.title==null) {
                /** @type {string}*/
                let link = LinkQueue.dequeueWithoutRemoving().YoutubeLink

                let page = PARSE_CONNECTION.page
                await page.goto(`${link}`, {waitUntil: 'load'})
                await page.waitForSelector('#description-inline-expander > tp-yt-paper-button:nth-child(4)')
                await page.click('#description-inline-expander > tp-yt-paper-button:nth-child(4)')
                let today = new Date()
                const newPagePromise = new Promise(x => PARSE_CONNECTION.browser.once('targetcreated', target => x(target.page())));  // объявляем промис
                await page.waitForSelector('#description-inline-expander > yt-attributed-string > span > span:nth-child(2) > a')
                await page.click('#description-inline-expander > yt-attributed-string > span > span:nth-child(2) > a', {button: "middle"})
                // кликаем средней кнопкой, ссылка открывается в новой вкладке
                const page2 = await newPagePromise;                   // объявляем новую вкладку/окно, теперь с ней можно работать
                //await page2.bringToFront();                           // делаем вкладку активной

                //await page2.waitForSelector('body')
                await page2.waitForTimeout(5000)
                let data = await page2.evaluate(() => {
                    let data = {}
                    let dataMas = document.querySelector('head').innerHTML
                    console.log(dataMas)
                    if (dataMas.includes('ВИДЕО') || dataMas.includes('content="Видео')) {
                        data.title = dataMas.substring(dataMas.indexOf('<title>ВИДЕО : ') + 15, dataMas.indexOf('</title>'))
                        data.description = 'Узнавайте о самых важных событиях в Европе и за ее пределами - последние новости, срочные новости, мир, бизнес, развлечения, политика, культура, путешествия'
                        data.keywords = 'последниеновости, срочныеновости, мир, бизнес, события'
                        let link = dataMas.substring(dataMas.indexOf('<link rel="canonical" href="') + 28, dataMas.indexOf('"><link rel="alternate"'))
                        data.description = data.description + '\nЧИТАТЬ ДАЛЕЕ: ' + link
                    } else {
                        data.title = dataMas.substring(dataMas.indexOf('<title>') + 7, dataMas.indexOf('</title>'))
                        data.description = dataMas.substring(dataMas.indexOf('<meta name="description"') + 34, dataMas.indexOf('"><meta name="keyw'))
                        data.keywords = dataMas.substring(dataMas.indexOf('<meta name="keywords" ') + 31, dataMas.indexOf('"><meta name="robots"'))
                        let link = dataMas.substring(dataMas.indexOf('<link rel="canonical" href="') + 28, dataMas.indexOf('"><link rel="alternate"'))
                        data.description = data.description + '\nЧИТАТЬ ДАЛЕЕ: ' + link
                    }
                    //data.all = dataMas
                    if (data.keywords.split(',').length < 4) {
                        data.keywords = data.keywords + ',новости,события,'
                    } else if (data.keywords.split(',').length < 5) {
                        data.keywords = data.keywords + ',новости,'
                    } else if (data.keywords.split(',').length === 5) {
                        data.keywords = data.keywords + ','
                    }
                    return data
                })
                let Data = data
                console.log("\n>>данные спаршены для видео:" + Data.title + "\n  " + today.toLocaleTimeString())
                await page2.close();
                Dump.SetParsed(Data.title, Data.description, Data.keywords)
            }
        } catch {
            console.log("\n>>Ошибка при парсинге нового видео\n  " + new Date().toLocaleTimeString())
        }

    }, 5 * 60 * 1000)

}

youtubeParcer()


module.exports = {
    youtubeParcer
}
