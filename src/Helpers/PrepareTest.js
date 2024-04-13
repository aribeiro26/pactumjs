const path = require('path')
const { ReadFile, GetFiles, CheckParams } = require('../utils/ReadFile')
const { GetPathParams, GetNameFile } = require('../utils/GetParams')
const { expect } = require('pactum')

const auth = process.env.AUTHORIZATION
const pathParams = GetPathParams()
const nameFile = GetNameFile()

async function PrepareTest() {
    if (!CheckParams(pathParams, nameFile)) {
        it('Teste de contrato falhou', async () => {
            expect.fail(
                'Verificar os parâmetros nos arquivos de configuração.json ou parâmetros da pipeline, Dúvidas consulte a documentação'
            )
        })
    }
    GetFiles(pathParams, nameFile).map(async (file) => {
        const pactumFile = JSON.parse(ReadFile(`${pathParams}/${file}`));
        pactumFile.map(async (config) => {
            const loadFile = JSON.parse(ReadFile(`${pathParams}/${config.loadFile}`))
            const contractConfig = require(path.resolve(__dirname, '../config/testContractConfig'))
            contractConfig(config, loadFile)
        }
    
    })
}

module.exports = { PrepareTest }
