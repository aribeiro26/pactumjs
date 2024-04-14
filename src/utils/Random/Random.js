const { LoremIpsum } = require('lorem-ipsum')

const lorem = new LoremIpsum({
    setencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 100,
        min: 4
    }
})

function Randoms(params) {
    Object.keys(params).forEach((i) => {
        switch (params[i].toString().trim().substring(0, 5)) {
            case 's_rnd':
                params[i] = lorem.generateWords(
                    +params[i].split('d_').toString().substring(6)
                )
                break
            case 'n_rnd':
                params[i] = Math.floor(Math.random() * 999999)
                break

            default:
                params
                break
        }
    })
    return params
}

module.exports = { Randoms }
