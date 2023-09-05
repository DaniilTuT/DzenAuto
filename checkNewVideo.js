const puppeteer = require("puppeteer");

const check = async (lastLink) => {
    const browser = await puppeteer.launch({headless:false})
    let today = new Date()
    const page = await browser.newPage()

    await page.goto(`https://www.youtube.com/@euronewsru/videos`,{waitUntil: "load"})
    
    console.log('>>начинаем поиск видео')
    console.log(today.toLocaleTimeString())
    let selector = 'div.ytd-rich-grid-renderer:nth-child(6)'
    await page.waitForSelector(`${selector}`)
    let html = await page.evaluate(() => {
        let html = document.querySelector(`ytd-two-column-browse-results-renderer.grid-3-columns > div:nth-child(1) > ytd-rich-grid-renderer:nth-child(1) > div:nth-child(8) > ytd-rich-grid-row:nth-child(1) > div:nth-child(2) > ytd-rich-item-renderer:nth-child(1)`).innerHTML
        return html
    })
    let str = html
    let link = str.substring(html.indexOf('<a id="thumbnail" class="yt-simple-endpoint inline-block style-scope ytd-thumbnail" aria-hidden="true" tabindex="-1" rel="null" href="')+134,html.indexOf('<a id="thumbnail" class="yt-simple-endpoint inline-block style-scope ytd-thumbnail" aria-hidden="true" tabindex="-1" rel="null" href="')+175)
    let links = {}
    links.SSLink = "https://www.SSyoutube.com"+link.substring(0,link.indexOf('"'))
    links.YoutubeLink = "https://www.youtube.com"+link.substring(0,link.indexOf('"'))
    await browser.close()
    if (lastLink !== links.SSLink) {
        console.log('>>новое видео найдено')
    }
    else {
        console.log('>>новое видео не найдено')
    }
    console.log(today.toLocaleTimeString())

    return links
}

module.exports = {
    check
}