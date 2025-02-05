const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Включаем плагин
puppeteer.use(StealthPlugin());


class Connection {
    constructor() {
        this.browser = null;
        this.page = null;
    }

    async init() {
        if (!this.browser) {
            this.browser = await puppeteer.launch({headless: false});
            this.page = await this.browser.newPage();
            await this.page.setUserAgent(
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            );
            await this.page.setExtraHTTPHeaders({
                'Accept-Language': 'en-US,en;q=0.9',
            });
        }
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
            this.page = null;
        }
    }

}

const UPLOAD_CONNECTION = new Connection()
const DOWNLOAD_CONNECTION = new Connection()
const PARSE_CONNECTION = new Connection()
const CHECK_CONNECTION = new Connection()


// Экспортируем Singleton-объект
module.exports = {
    UPLOAD_CONNECTION, CHECK_CONNECTION, PARSE_CONNECTION, DOWNLOAD_CONNECTION
}
