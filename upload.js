const puppeteer = require("puppeteer");
const {FileChooser} = require("puppeteer");
const path = require("path");


const upload = async (endpoint,data,path) => {
    const brows = await puppeteer.connect({browserWSEndpoint:endpoint})
    let pageList = await brows.pages()
    const page = pageList[0]
    console.log(pageList)
    await page.bringToFront()
    await page.goto(`https://dzen.ru/profile/editor/eur0news_po_russki`,{waitUntil: "load"})

    await page.waitForTimeout(5000)
    //перейти в студию
    let selector = '.desktop-channel-header-layout__mainButton-2n > button:nth-child(1)'
    await page.waitForSelector(`${selector}`,{timeout:60000})
    await page.click(`${selector}`)
    await page.waitForTimeout(5000)
    //+
    selector = '.author-studio-header__addButton-1Z'
    await page.waitForSelector(`${selector}`,{timeout:60000})
    await page.click(`${selector}`)
    await page.waitForTimeout(5000)
    //choose video
    selector = 'label.ui-lib-context-menu__item:nth-child(3)'
    await page.waitForSelector(`${selector}`,{timeout:60000})
    await page.click(`${selector}`)
    await page.waitForTimeout(5000)
    //choose file
    var futureFileChooser = page.waitForFileChooser()
    selector = 'body > div.Modal.Modal_visible.Modal_hasAnimation.Modal_theme_normal.Modal_overflowHidden > div.Modal-Wrapper > div > div > div > div.video-upload-dialog__up-popup-content > div > div.video-upload-dialog__drag-area > div:nth-child(4) > button'
    await page.waitForSelector(`${selector}`,{timeout:60000})
    await page.click(`${selector}`)
    let fileChooser = await futureFileChooser
    await page.waitForTimeout(5000)
    await  fileChooser.accept([path])
    //загрузка описания, ключевых слов, названия
    selector = 'body > div.ui-lib-modal._view-type_inner-close-m._with-vertical-align._transition-enter-done > div > div > div.video-settings-redesign__form-6f > div.ui-lib-modal-content.video-settings-redesign__container-YN > div > div > div.publication-settings-content.publication-settings-content_is-extra-width > div:nth-child(2) > div > div.quill-text-field__fieldWithCounter-d2 > div.quill-text-field__editorContainer-mB.ql-container > div.ql-editor.ql-blank'
    await page.waitForSelector(selector)
    await page.click(selector);
    await page.keyboard.type(data.description)

    selector = 'body > div.ui-lib-modal._view-type_inner-close-m._with-vertical-align._transition-enter-done > div > div > div.video-settings-redesign__form-6f > div.ui-lib-modal-content.video-settings-redesign__container-YN > div > div > div.publication-settings-content.publication-settings-content_is-extra-width > div:nth-child(4) > div > div.ui-lib-tag-input._size_l._min-rows_1._type_desktop._is-redesign > div > div.ui-lib-tag-input__suggest-container > input'
    await page.waitForSelector(selector)
    await page.click(selector);
    await page.keyboard.type(data.keywords)


    selector = 'body > div.ui-lib-modal._view-type_inner-close-m._with-vertical-align._transition-enter-done > div > div > div.video-settings-redesign__form-6f > div.form-actions__actions-3E > button'
    await page.waitForSelector(selector)
    await page.click(selector);
}

module.exports = {
    upload
}