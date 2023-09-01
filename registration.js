const puppeteer = require("puppeteer");
const {login,password} = require('./password.js')
const dzenRegistration = async () => {
    const browser = await puppeteer.launch({headless:false})

    const page = await browser.newPage()
    await page.goto(`https://dzen.ru/profile/editor/eur0news_po_russki`, {waitUntil: "networkidle2"})

    page.waitForTimeout(3000)

    //подписка
    selector = 'body > div.content > div.desktop-layout__container-2A.desktop-layout__isWhiteDzen-3Z > div > main > section.desktop-layout__content-1S > div > div > div.desktop-channel-layout__header._with-border > div > div.desktop-channel-header-layout__desktopChannelInfoLayout-3S > div.desktop-channel-header-layout__controls-18 > div.desktop-channel-header-layout__mainButton-2n > button > span'
    await page.waitForSelector(`${selector}`)
    await page.click(`${selector}`)

    page.waitForTimeout(3000)

    //яндекс id
    selector = 'body > div.Modal.Modal_visible.Modal_hasAnimation.Modal_theme_normal > div.Modal-Wrapper > div > div > div > div.login-content__container-g1 > div.login-content__yaButtonWrapper-15 > a > span.base-login-button__loginButtonText-cT.base-button__childrenContent-DJ'
    await page.waitForSelector(`${selector}`)
    await page.click(`${selector}`)

    page.waitForTimeout(3000)

    // кликаем по полю ввода что бы поймать фокус
    selector = '#passp-field-login'
    await page.waitForSelector(selector)
    await page.click(selector);
    // вводим логин с клавиатуры
    await page.keyboard.type(login)
    await page.click('#passp\\:sign-in')
    //пароль

    try {
        selector = '#passp-field-passwd'
        await page.waitForSelector(selector)
        await page.click(selector)
        await page.keyboard.type(password)

        await page.click('#passp\\:sign-in')
    } catch (error) {
        selector = '#login'
        await page.waitForSelector(selector)
        await page.click(selector);
        // вводим логин с клавиатуры
        await page.keyboard.type(login)

        selector = '#passwd'
        await page.waitForSelector(selector)
        await page.click(selector)
        await page.keyboard.type(password)

        await page.click('body > div > div.layout-inner > div.domik-wrap > div > div.domik-content > form > div.domik-row > div > button > span')
    }
    let endpoint = await browser.wsEndpoint()

    await browser.disconnect()
    console.log('>>зарегестрировались в браузере')
    return endpoint

}
module.exports = {
    dzenRegistration
}