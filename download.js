const puppeteer = require('puppeteer')


const download = async (link) => {
    console.log(">>начинаю загрузку видео")
    const brows = await puppeteer.launch( {headless: false})

    const page1 = await brows.newPage()
    await page1.goto(`${link}`,{waitUntil: "load"})
    await page1.waitForTimeout(5000)
    let selector = '#sf_result > div > div > div.info-box > div.link-box > div.def-btn-box'
    await page1.waitForSelector(`${selector}`,{visible:true})
    await page1.click(`${selector}`)

    selector = '#sf_result > div > div.result-box.video > div.info-box > div.link-box > div.def-btn-box'
    await page1.waitForSelector(`${selector}`)
    let html = await page1.evaluate(() => {
        let html = document.querySelector('#sf_result > div > div.result-box.video > div.info-box > div.link-box > div.def-btn-box').innerHTML
        return html
    })
    let pathForUpload = 'C:\\Users\\Даниил\\Downloads\\' + html.substring(html.indexOf('download="')+10,html.indexOf('" data-quality="'))
    console.log("Полный путь до видео: "+pathForUpload)
    setTimeout(async () => {
        await brows.close()
        console.log(pathForUpload)
    }, 90000,brows);
    console.log(pathForUpload)
    return pathForUpload
}

module.exports = {
    download
}