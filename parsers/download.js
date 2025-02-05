const puppeteer = require('puppeteer')
const {DOWNLOAD_CONNECTION} = require('../Classes/Connection');
const {LinkQueue} = require('../Classes/Queue');
const Dump = require('../Classes/Dump');
const fs = require("node:fs");
const {getLastModifiedMp4} = require("../Helpers/getLastModifiedMp4");


const download = async () => {
    setInterval(async () => {

        if (LinkQueue.any() && Dump.path==null) {
            /** @type {string}*/
            let link = LinkQueue.dequeueWithoutRemoving().SSLink
            let today = new Date()
            console.log("\n>>начинаю загрузку видео\n  "+today.toLocaleTimeString())
            let page = DOWNLOAD_CONNECTION.page
            await page.goto(link, {waitUntil: 'networkidle2'})
            await page.waitForTimeout(5000)
            let selector = '#sf_result > div > div > div.info-box > div.link-box > div.def-btn-box'
            await page.waitForSelector(`${selector}`, {visible: true})
            await page.click(`${selector}`)
            await page.bringToFront();

            selector = '#sf_result > div > div > div.info-box > div.link-box > div.def-btn-box'
            await page.waitForSelector(`${selector}`, {visible: true})
            await page.click(`${selector}`)
            await page.bringToFront();
            try {
                await page.click(`${selector}`)
            }
            catch {}


            try {
                selector = '#c-ui-popup > div > div > button'
                await page.waitForSelector(`${selector}`, {timeout: 180000, visible: true})
                await page.click(`${selector}`)
                await page.bringToFront();
                await page.waitForTimeout(30000)
                let pathForUpload = await getLastModifiedMp4()
                console.log("\n>>Загрузка видео завершена\n" +
                    "\t>>Полный путь до видео: " + pathForUpload + "\n  " +
                    today.toLocaleTimeString())
                if (pathForUpload !== null) {
                    Dump.SetDownloaded(pathForUpload)
                }
            }
            catch {
                console.log("\n>>Ошибка при скачивании файла\n  "+new Date().toLocaleTimeString())
            }
        }
    }, 5*60*1000)
}

module.exports = {
    download
}