const puppeteer = require("puppeteer");
//TODO validator for yotubeParcer and download(with fs)
const valid = async () => {
    const brows = await puppeteer.launch({headless: false})

    let link1 = 'https://www.youtube.com/watch?v=lFWDeJ03sJc'

    const page = await brows.newPage()
    await page.goto(`${link1}`,{waitUntil:'load'})

    const page2 = await brows.newPage()
    await page2.goto(`${link1}`,{waitUntil:'load'})
}

valid()