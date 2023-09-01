const {download} = require('./download.js')
const {youtubeParcer} = require('./youtubeParcer.js')
const {upload} = require('./upload.js')
const {dzenRegistration} = require('./registration')
const puppeteer = require("puppeteer");
const path = require("path");

const drg = async () => {

    let lastLink = ''
    const browser = await puppeteer.launch()

    const page = await browser.newPage()

    const endpoint = await dzenRegistration()

    await page.goto(`https://www.youtube.com/@euronewsru/videos`,{waitUntil: "load",timeout:60000})
    setInterval(async () => {

        console.log('>>начинаем поиск видео')
        let selector = 'div.ytd-rich-grid-renderer:nth-child(6)'
        await page.waitForSelector(`${selector}`,{visible: true})

        let html = await page.evaluate(() => {
            let html = document.querySelector(`ytd-rich-grid-row.style-scope:nth-child(1) > div:nth-child(1)`).innerHTML
            return html
        })
        let str = html

        let link = str.substring(html.indexOf('<a id="thumbnail" class="yt-simple-endpoint inline-block style-scope ytd-thumbnail" aria-hidden="true" tabindex="-1" rel="null" href="')+134,html.indexOf('<a id="thumbnail" class="yt-simple-endpoint inline-block style-scope ytd-thumbnail" aria-hidden="true" tabindex="-1" rel="null" href="')+175)
        let SSLink = "https://www.SSyoutube.com"+link.substring(0,link.indexOf('"'))
        let YoutubeLink = "https://www.youtube.com"+link.substring(0,link.indexOf('"'))

        console.log(YoutubeLink)
        console.log(lastLink)
        console.log(SSLink !== lastLink)


        if (SSLink !== lastLink) {
            lastLink = SSLink
            let path = await download(SSLink)
            let data = await youtubeParcer(YoutubeLink)
            upload(endpoint,data,path)
        }
    },150000)
}

drg()