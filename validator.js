const puppeteer = require("puppeteer");
const fs = require('fs')
const path = require('path')
//TODO validator for yotubeParcer and download(with fs)
const valid = async (pathForUpload) => {
    let folderPath = 'C:\\Users\\Даниил\\Downloads'
    const isFile = fileName => {
        return fs.lstatSync(fileName).isFile()
    }
    let file = fs.readdirSync(folderPath).map(fileName => {
        return path.join(folderPath, fileName)
    })
    file = file.filter(isFile)
    console.log(file)
    return file[file.length-1]
}

module.exports = {
    valid
}