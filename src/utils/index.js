const {
    ReadFile,
    GetFiles,
    CheckParams
} = require('../utils/ReadFile/ReadFile')
const { Randoms } = require('../utils/Random/Random')
const {
    GetToken,
    Authentication,
    GetAuthID
} = require('../utils/GetToken/GetToken')
const { CurrentDate } = require('../utils/CurrentDate/CurrentDate')
const { BodyFile } = require('../utils/BodyFile/BodyFile')
module.exports = {
    ReadFile,
    GetFiles,
    CheckParams,
    CurrentDate,
    Randoms,
    GetToken,
    Authentication,
    GetAuthID,
    BodyFile
}
