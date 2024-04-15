const path = require('path')
const { ReadFile, GetFiles, CheckParams } = require('../../utils')
const { GetPathParams } = require('../../support')
const { GetNameFile } = require('../../support')
const {
    Auth,
    BodyParams,
    PathParams,
    QueryParams,
    FormParams,
    user,
    pass
} = require('../../Helpers/OptionsTest/OptionsTest')
const { TestContractConfig } = require('../../config')

const auth = process.env.AUTHORIZATION
const pathParams = GetPathParams()
const nameFile = GetNameFile(process.env.NAMEFILE)

async function PrepareTest() {
    if (!CheckParams(pathParams, nameFile)) {
        throw new Error(
            'Teste de contrato falhou, Verificar os parâmetros nos arquivos de configuração.json ou parâmetros da pipeline, Dúvidas consulte a documentação'
        )
    }
    GetFiles(pathParams, nameFile).map(async (file) => {
        const pactumFile = JSON.parse(ReadFile(`${pathParams}/${file}`))

        pactumFile.map(async (config) => {
            config.Headers.Authorization = await Auth(config, auth)
            if (config.Headers.Authorization === undefined) {
                delete config.Headers.Authorization
            }         
            config.BodyParams = await BodyParams(config)
            config.PathParams = await PathParams(config)
            config.QueryParams = await QueryParams(config)
            config.user = await user(config)
            config.pass = await pass(config)

            let loadFile = JSON.parse(
                ReadFile(path.resolve(pathParams, config.pathFiles).trim())
            )

            if (!loadFile) {
                const baseName = path.basename(config.pathFiles)
                loadFile = JSON.parse(
                    ReadFile(
                        path
                            .resolve(pathParams, config.pathFiles)
                            .replace(baseName + '/', '')
                            .trim()
                    )
                )
            }

            TestContractConfig(config, loadFile)
        })
    })
}

module.exports = { PrepareTest }
