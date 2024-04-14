const path = require('path')
const {
    ReadFile,
    GetFiles,
    CheckParams
} = require('@src/utils/index')
const { GetPathParams } = require('@src/support/GetParams')
const { GetNameFile } = require('@src/support/GetNameFile')
const {
    Auth,
    BodyParams,
    PathParams,
    QueryParams
} = require('@src/Helpers/OptionTest')
const { TestContractConfig } = require('@src/config/')
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
        const pactumFile = JSON.parse(ReadFile(`${pathParams}/${file}`))
        pactumFile.map((config) => {
            Promise.all([
                Auth(config, auth),
                BodyParams(config),
                PathParams(config),
                QueryParams(config)
            ]).then(([authorization, bodyParams, pathParams, queryParams]) => {
                config.Headers.Authorization = authorization
                config.BodyParams = bodyParams
                config.PathParams = pathParams
                config.QueryParams = queryParams

                let loadFile = JSON.parse(
                    ReadFile(path.basename(pathParams, config.pathFiles).trim())
                )
                if (loadFile === false) {
                    const basename = path.basename(pathParams, config.pathFiles)
                    loadFile = JSON.parse(
                        ReadFile(
                            path
                                .resolve(pathParams, config.pathFiles)
                                .replace(basename + '/', '')
                                .trim()
                        )
                    )
                }
                TestContractConfig(config, loadFile)
            })
        })
    })
}

module.exports = { PrepareTest }
