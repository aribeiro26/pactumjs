const { Randoms, CurrentDate, Authentication } = require('../../utils/')

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
    if (params) {
        params = CurrentDate(params)
        params = Randoms(params)
    }
    return params
}

async function BodyParams(config) {
    return processParams(config.BodyParams)
}

async function PathParams(config) {
    return processParams(config.PathParams)
}

async function QueryParams(config) {
    return processParams(config.QueryParams)
}

module.exports = { Auth, BodyParams, PathParams, QueryParams }
