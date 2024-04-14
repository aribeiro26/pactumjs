async function GetAuthID(url, headers) {
    try {
        const response = await axios.get(url, { headers })
        if (response.status >= 500) {
            throw new Error(`Server error: status code ${response.status}`)
        }

        return response.data
    } catch (error) {
        throw new Error('Error fetching AuthID:', error)
    }
}

async function GetToken(url, payload, headers) {
    try {
        const { data } = await axios.post(url, payload, {
            headers
        })
    } catch (error) {
        throw new Error('Error fetching Token:', error)
    }
}

async function Authentication(contractConfig,token) {
    Object.keys(contractConfig).forEach((i) => {
        switch (contractConfig[i].Authorization === 't_rnd') {
            case true:
                contractConfig[i] = `Bearer ${token}`
                break
            default:
                contractConfig
                break
        }
    })
    return contractConfig
}

module.exports = { Authentication, GetAuthID, GetToken }
