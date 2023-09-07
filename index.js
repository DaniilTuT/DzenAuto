const {download} = require('./download.js')
const {youtubeParcer} = require('./youtubeParcer.js')
const {upload} = require('./upload.js')
const {dzenRegistration} = require('./registration')
const {check} = require('./checkNewVideo.js')
const puppeteer = require("puppeteer");
const path = require("path");
const {valid} = require('./validator.js')
const drg = async () => {
    let today = new Date()
    let lastLink = ''
    
    let endpoint = await dzenRegistration()

    setInterval(async () => {
        let links = await check(lastLink)

        if (links.SSLink !== lastLink) {
            lastLink = links.SSLink
            let pathForUpload = await download(links.SSLink)
            let data = await youtubeParcer(links.YoutubeLink)
            await valid()
            pathForUpload = await valid()
            endpoint = await upload(endpoint,data,pathForUpload)
    }
    },150000)
}

drg()