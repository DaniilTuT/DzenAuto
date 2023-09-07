const fs = require('fs')
const path = require('path');
const readDir = (folderPath) => {
    return  fs.readdirSync(folderPath).map(fileName => {
        return path.join(folderPath, fileName)
    })

}
const valid = async () => {
    let folderPath = 'C:\\Users\\Даниил\\Downloads'
    let dir = readDir(folderPath)

    while (dir[dir.length-1].includes('.crdownload')) {
        dir = readDir(folderPath)
    }
    return dir[dir.length-1]
}

module.exports = {
    valid
}




