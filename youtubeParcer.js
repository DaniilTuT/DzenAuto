const puppeteer = require('puppeteer')
const youtubeParcer = async (link) => {
    const brows = await puppeteer.launch({headless:false})
    const page = await brows.newPage()
    await page.goto(`${link}`,{waitUntil:'load'})
    await page.waitForSelector('#expand')
    await page.click('#expand')

    console.log(">>начинаю парсить данные")
    const newPagePromise = new Promise(x => brows.once('targetcreated', target => x(target.page())));  // объявляем промис
    await page.waitForSelector('#description-inline-expander > yt-attributed-string > span > span:nth-child(2) > a')
    await page.click('#description-inline-expander > yt-attributed-string > span > span:nth-child(2) > a', {button: "middle"})
    // кликаем средней кнопкой, ссылка открывается в новой вкладке
    const page2 = await newPagePromise;                   // объявляем новую вкладку/окно, теперь с ней можно работать
    await page2.bringToFront();                           // делаем вкладку активной


    let data = await page2.evaluate(() => {
        let data = {}
        let dataMas = document.querySelector('head').innerHTML
        data.title = dataMas.substring(dataMas.indexOf('<title>') + 7, dataMas.indexOf('</title>'))
        data.description = dataMas.substring(dataMas.indexOf('<meta name="description"') + 34, dataMas.indexOf('"><meta name="keyw'))
        data.keywords = dataMas.substring(dataMas.indexOf('<meta name="keywords" ') + 31, dataMas.indexOf('"><meta name="robots"'))
        link = dataMas.substring(dataMas.indexOf('<link rel="canonical" href="') + 28, dataMas.indexOf('"><link rel="alternate"'))
        data.description = data.description + '\nЧИТАТЬ ДАЛЕЕ: ' + link
        if (data.keywords.split(',').length < 4) {data.keywords = data.keywords + ',новости,события,'}
        else if (data.keywords.split(',').length < 5) {data.keywords = data.keywords + ',новости,'}
        return data
    })
    let Data = data
    console.log(">>полученные данные:")
    console.log(Data)

    setTimeout(async () => {
        await brows.close()
    }, 5000, brows);
    return Data
}


//youtubeParcer('https://www.youtube.com/watch?v=QZzJ5aQZL_I')
module.exports = {
    youtubeParcer
}
