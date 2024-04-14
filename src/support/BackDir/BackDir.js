const path = require('path')

const BackDir = (dir) => {
    const oneStepBack = path.join(dir, '../')
    return oneStepBack
}

module.exports = { BackDir }