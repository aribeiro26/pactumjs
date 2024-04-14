const CurrentDate = (params) => {
    const bussinesDayInMiliSeconds = 5 * 60 * 60 * 24 * 1000
    const date = new Date(new Date() - bussinesDayInMiliSeconds)
    Object.keys(params).forEach((i) => {
        switch (params[i].toString().trim().substring(0, 18)) {
            case 's_curr_date':
                params[i] = new Date().toISOString().slice(0, 10)
                break
            case 's_week_before_date':
                params[i] = date.toISOString().slice(0, 10)
                break

            default:
                params
                break
        }
    })
    return params
}
module.exports = { CurrentDate }
