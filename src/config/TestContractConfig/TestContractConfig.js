const { spec, request, reporter } = require('pactum')
const addContext = require('mochawesome/addContext')

const AwesomeReporter = {
    afterSpec(spec) {
        const mochaContext = spec.recorded['mocha']
        addContext(mochaContext, {
            title: 'Pact Request',
            value: spec.request
        })
        addContext(mochaContext, {
            title: 'Pact Response',
            value: spec.response
        })
    }
}

const TestContractConfig = (config, loadFile) => {
    describe(config.name, async () => {
        before((done) => {
            request.setBaseUrl(config.baseUrl)

            reporter.add(AwesomeReporter)
            done()
        })
        beforeEach(function () {
            test.records('mocha', this)
        })
        const test = spec()

        if (!config.FormParams) {
            it(`Realizando o teste de contrato - ${config.api}`, async () => {
                await test[config.Method.toLowerCase()](config.Path)
                    .withRequestTimeout(90000)
                    .withCompression()
                    .withAuth(config.user, config.pass)
                    .withHeaders(config.Headers)
                    .withQueryParams(config.QueryParams)
                    .withPathParams(config.PathParams)
                    .withBody(config.BodyParams)
                    .expectStatus(config.Status)
                    .expectJsonLike(loadFile)
            })
            return
        }
        it(`Realizando o teste de contrato - ${config.api}`, async () => {
            await test[config.Method.toLowerCase()](config.Path)
                .withRequestTimeout(90000)
                .withCompression()
                .withAuth(config.user, config.pass)
                .withHeaders(config.Headers)
                .withForm(config.FormParams)
                .withQueryParams(config.QueryParams)
                .withPathParams(config.PathParams)
                .withBody(config.BodyParams)
                .expectStatus(config.Status)
                .expectJsonLike(loadFile)
        })

        after(async function (done) {
            done()
        })
    })
}

module.exports = { TestContractConfig }
