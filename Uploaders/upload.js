const puppeteer = require("puppeteer");
const {FileChooser} = require("puppeteer");
const fs = require('fs');
const {DataQueue} = require("../Classes/Queue");
const {UPLOAD_CONNECTION} = require("../Classes/Connection");


const upload = async () => {
    setInterval(async () => {
        try {
            if (DataQueue.any()) {
                /** @type {Dump} */
                let data = DataQueue.dequeue()

                let page = UPLOAD_CONNECTION.page

                await page.bringToFront()
                await page.goto(`https://dzen.ru/profile/editor/eur0news_po_russki`, {waitUntil: "load"})

                await page.waitForTimeout(5000)

                //+
                let selector = '.editor--author-studio-header__addButton-1Z'
                await page.waitForSelector(`${selector}`, {timeout: 60000})
                await page.click(`${selector}`)
                await page.waitForTimeout(5000)
                //choose video
                selector = 'label.ui-lib-context-menu__item:nth-child(3) > div:nth-child(2) > span:nth-child(1)'
                await page.waitForSelector(`${selector}`, {timeout: 60000})
                await page.click(`${selector}`)
                await page.waitForTimeout(5000)
                //choose file
                let futureFileChooser = page.waitForFileChooser()
                selector = 'button.editor--base-button__xl-28'
                await page.waitForSelector(`${selector}`, {timeout: 60000})
                await page.click(`${selector}`)
                let fileChooser = await futureFileChooser
                await page.waitForTimeout(5000)
                await fileChooser.accept([data.path])
                //загрузка описания, ключевых слов, названия


                selector = 'textarea.Textarea-Control:nth-child(2)'
                await page.waitForSelector(selector, {timeout: 90000})
                await page.click(selector);
                await page.keyboard.down('ControlLeft')
                await page.keyboard.press('a')
                await page.keyboard.up('ControlLeft')
                await page.keyboard.type(data.title)


                selector = '.ql-editor'
                await page.waitForSelector(selector)
                await page.click(selector);
                await page.keyboard.type(data.description)

                selector = '.editor--tag-input__input-29'
                await page.waitForSelector(selector)
                await page.click(selector);
                await page.keyboard.type(data.keywords)


                selector = '.editor--form-actions__action-15'
                await page.waitForSelector(selector)
                await page.click(selector);
                let isClicked = false
                while (!isClicked) {
                    try {
                        await page.click(selector);
                    } catch {
                        isClicked = true
                    }
                }
                console.log('\n>>закончили загрузку\n  ' + new Date().toLocaleTimeString())

                fs.unlink(data.path, err => {
                    if (err) throw err; // не удалось удалить файл
                });
            }
        } catch {
            console.log("\n>>Ошибка при выгрузке нового видео\n  " + new Date().toLocaleTimeString())
        }
    }, 25 * 6 * 1000)

}

module.exports = {
    upload
}