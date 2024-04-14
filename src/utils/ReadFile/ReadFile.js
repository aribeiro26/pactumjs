const fs = require('fs')

function ReadFile(filename) {
    try {
        if (fs.existsSync(filename)) {
            filename = fs.readFileSync(`${filename}`, 'utf8')
        } else {
            filename = filename.toLowerCase()
            filename = fs.readFileSync(`${filename}`, 'utf8')
        }
    } catch (e) {
        throw new Error('Error reading file:', e)
    }
    return filename
}

function GetFiles(nameDir, fileconfigName) {
    try {
        nameDir = fs
            .readdirSync(nameDir)
            .filter(
                (file) =>
                    file.toLowerCase().indexOf(fileconfigName.toLowerCase()) >
                    -1
            )
    } catch (e) {
        throw new Error('Error reading file:', e)
    }
    return nameDir
}

function CheckParams(nameDir, fileconfigName) {
    try {
        nameDir = fs
            .readdirSync(nameDir)
            .filter(
                (file) =>
                    file.toLowerCase().indexOf(fileconfigName.toLowerCase()) >
                    -1
            )
    } catch (e) {
        throw new Error('Error reading file:', e)
    }
    return params
}

module.exports = { ReadFile, GetFiles, CheckParams }
