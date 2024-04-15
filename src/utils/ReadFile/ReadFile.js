const fs = require('fs')

function ReadFile(filename) {
    if (!fs.existsSync(filename)) {
        console.error(!fs.existsSync(filename), 'File does not exist')
        return
    }

    filename = fs.readFileSync(filename, 'utf8')

    return filename
}

function GetFiles(nameDir, fileconfigName) {
    if (!fs.existsSync(nameDir)) {
        console.error(!fs.existsSync(nameDir), 'Directory does not exist')
        return
    }

    const files = fs
        .readdirSync(nameDir)
        .filter((file) =>
            file.toLowerCase().includes(fileconfigName.toLowerCase())
        )

    return files
}

function CheckParams(nameDir, fileconfigName) {
    if (!fs.existsSync(nameDir)) {
        console.error(!fs.existsSync(nameDir), 'Directory does not exist')
        return
    }

    const files = fs
        .readdirSync(nameDir)
        .filter((file) =>
            file.toLowerCase().includes(fileconfigName.toLowerCase())
        )

    return files.length > 0
}

module.exports = { ReadFile, GetFiles, CheckParams }
