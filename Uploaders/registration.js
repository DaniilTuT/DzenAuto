const puppeteer = require("puppeteer");
const {login,password} = require('../Helpers/password')
const {UPLOAD_CONNECTION} = require("../Classes/Connection");




const dzenRegistration = async () => {
    await UPLOAD_CONNECTION.init()
    let page = await UPLOAD_CONNECTION.page
    let today = new Date()
    await page.goto(`https://dzen.ru/profile/editor/eur0news_po_russki`, {waitUntil: "networkidle2"})
    await page.waitForTimeout(3000)
    await page.goto(`https://dzen.ru/profile/editor/eur0news_po_russki`, {waitUntil: "networkidle2"})
    await page.waitForTimeout(3000)

    //подписка

    let selector = 'div.desktop2--desktop-info-layout__mainButton-1q > button > span'
    await page.waitForSelector(selector,{visibility:"visible"})
    await page.hover(selector);
    await page.waitForTimeout(500)
    await page.click(selector,{ delay: 100, button: 'left' })
    await page.waitForTimeout(3000)

    //яндекс id
    selector = 'body > div.desktop2--modal__rootElement-l4 > div.desktop2--modal__modal-Hw > div.desktop2--login-content__container-g1.desktop2--login-content__isAuthThroughPhone-3W.desktop2--login-content__isLoginModalInCenter-3W > div.desktop2--login-content__yaButtonWrapper-15.desktop2--login-content__isAuthThroughPhone-3W > a > span.desktop2--base-login-button__loginButtonText-cT.desktop2--base-button__childrenContent-DJ'
    await page.waitForSelector(`${selector}`,{timeout:60000,visibility:"visible"})
    await page.click(`${selector}`)
    await page.waitForTimeout(3000)

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
    console.log('\n>>зарегестрировались в браузере\n  '+today.toLocaleTimeString())
}


module.exports = {
    dzenRegistration
}