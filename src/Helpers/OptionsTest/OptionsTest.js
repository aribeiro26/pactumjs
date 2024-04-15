const {
    Randoms,
    CurrentDate,
    Authentication,
    BodyFile
} = require('../../utils/')

async function Auth(config, Authorization) {
    if (!Authorization) {
        return config.Headers.Authorization
    }
    if (['t_rnd', 'g_rnd'].includes(config.Headers.Authorization)) {
        return (config.Headers.Authorization = await Authentication(config))
    }
    return (config.Headers.Authorization = '')
}

function processParams(params) {
    if (!params) {
        return (params = { '': '' })
    }
    params = CurrentDate(params)
    params = Randoms(params)
    return params
}

async function BodyParams(config) {
    if (!config.BodyParams.file) {
        return processParams(config.BodyParams)
    }
    return (config.BodyParams = BodyFile(config.BodyParams.file))
}

async function PathParams(config) {
    return processParams(config.PathParams)
}

async function QueryParams(config) {
    return processParams(config.QueryParams)
}

async function user(config) {
    return processParams(config.QueryParams)
}

async function pass(config) {
    return processParams(config.QueryParams)
}

module.exports = {
    Auth,
    BodyParams,
    PathParams,
    QueryParams,
    user,
    pass
}
