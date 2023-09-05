const puppeteer = require("puppeteer");
const fs = require('fs')
const path = require('path');
const {waitForDebugger} = require("inspector");
const {log} = require("console");

const valid = () => {
    let folderPath = 'C:\\Users\\Даниил\\Downloads'
    let today = new Date()
    const isFile = fileName => {
        return fs.lstatSync(fileName).isFile()
    }
    let file = fs.readdirSync(folderPath).map(fileName => {
        return path.join(folderPath, fileName)
    })
    file = file.filter(isFile)
    file = file.filter(fileName => {
        return fileName.includes('mp4')
    })
    while (file[file.length - 1].includes('.crdownload')) {
        file = fs.readdirSync(folderPath).map(fileName => {
            return path.join(folderPath, fileName)
        })
        file = file.filter(isFile)
        file = file.filter(fileName => {
            return fileName.includes('mp4')
        })
    }
    return file[file.length - 1]
    //console.log(today.toLocaleTimeString())
}

module.exports = {
    valid
}