const {download} = require('./parsers/download.js')
const {youtubeParcer} = require('./parsers/youtubeParcer.js')
const {upload} = require('./Uploaders/upload.js')
const {dzenRegistration} = require('./Uploaders/registration')
const {check} = require('./parsers/checkNewVideo.js')
const {UPLOAD_CONNECTION, PARSE_CONNECTION, CHECK_CONNECTION, DOWNLOAD_CONNECTION} = require('./Classes/Connection');

const drg = async () => {
    await PARSE_CONNECTION.init()
    await DOWNLOAD_CONNECTION.init()
    await CHECK_CONNECTION.init()
    await UPLOAD_CONNECTION.init()
    await dzenRegistration()
    await check()
    await download()
    await youtubeParcer()
    await upload()
}


drg()