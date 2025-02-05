const puppeteer = require("puppeteer");
const {CHECK_CONNECTION} = require('../Classes/Connection');
const {LinkQueue} = require("../Classes/Queue");
const PARSED_LINKS = []

const check = async () => {

    setInterval(async () => {
        try {
            let page = CHECK_CONNECTION.page
            let today = new Date()

            await page.goto(`https://www.youtube.com/@euronewsru/videos`, {waitUntil: "load"})

            let selector = 'div.ytd-rich-grid-renderer:nth-child(6)'
            await page.waitForSelector(`${selector}`)
            let html = await page.evaluate(() => {
                let html = document.querySelector(`ytd-rich-item-renderer.style-scope:nth-child(1) > div:nth-child(1) > ytd-rich-grid-media:nth-child(1)`).innerHTML
                return html
            })
            let str = html
            let link = str.substring(html.indexOf('<a id="thumbnail" class="yt-simple-endpoint inline-block style-scope ytd-thumbnail" aria-hidden="true" tabindex="-1" rel="null" href="') + 134, html.indexOf('<a id="thumbnail" class="yt-simple-endpoint inline-block style-scope ytd-thumbnail" aria-hidden="true" tabindex="-1" rel="null" href="') + 175)
            let links = {}
            links.SSLink = "https://www.SSyoutube.com" + link.substring(0, link.indexOf('"'))
            links.YoutubeLink = "https://www.youtube.com" + link.substring(0, link.indexOf('"'))
            if (!PARSED_LINKS.includes(links.SSLink)) {
                console.log(`\n>>новое видео найдено ${links.YoutubeLink}\n  ` + today.toLocaleTimeString())
                LinkQueue.enqueue(links)
                if (PARSED_LINKS.length > 2) {
                    PARSED_LINKS.shift()
                }
                PARSED_LINKS.push(links.SSLink)
            }
        }
        catch {
            console.log("\n>>Ошибка при поиске нового видео\n  "+new Date().toLocaleTimeString())
        }
    }, 90000)
}

module.exports = {
    check
}