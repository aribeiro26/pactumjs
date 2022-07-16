const { spec, request, reporter } = require("pactum");
const addContext = require("mochawesome/addContext");
const pactconfig = require("../../../parameters/parameters.json");
const { LoadFile } = require("../../utils/LoadFile");

const awesome_reporter = {
    afterSpec(spec) {
        const mocha_context = spec.recorded["mocha"];
        addContext(mocha_context, {
            title: "Request",
            value: spec.request,
        });
        addContext(mocha_context, {
            title: "Response",
            value: spec.response,
        });
    },
};

for (const config of pactconfig) {
    const jsonfile = JSON.parse(LoadFile());
    describe(`Teste de Api do tipo de requisição ${config.Method} do Time - ${config.name}`, async () => {
        before(() => {
            request.setBaseUrl(config.baseurl);
            reporter.add(awesome_reporter);
        });
        beforeEach(function () {
            test.records("mocha", this);
        });
        const test = spec();
        it(`Iniciando a request da api - ${config.api}`, async () => {
            await test
                .withRequestTimeout(90000)
                .withPath(config.Path)
                .withMethod(config.Method)
                .withQueryParams(config.QueryParams)
                .withHeaders(config.Headers)
                .withPathParams(config.PathParams)
                .withAuth(config.user, config.pass)
                .expectStatus(config.Status)
                .expectJsonLike(jsonfile);
        });
    });
}