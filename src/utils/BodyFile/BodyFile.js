const { ReadFile } = require('../ReadFile/ReadFile')
const path = require('path')

function BodyFile(params) {
    if (!params) {
        return params
    }
    params = JSON.parse(ReadFile(path.resolve(params)))

    return params
}

module.exports = { BodyFile }
