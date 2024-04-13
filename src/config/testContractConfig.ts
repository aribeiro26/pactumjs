import { spec, request, reporter } from "pactum"
import addContext from "mochawesome/addContext"

const AwesomeReporter = {
    name: 'AwesomeReporter',
    afterSpec(spec: any) {
        const mochaContext = spec.recorded["mocha"];
        addContext(mochaContext, {
            title: "Request",
            value: spec.request
        });
        addContext(mochaContext, {
            title: "Response",
            value: spec.response
        });        
    },
    afterStep: () => {},
    afterTest: () => {},
    afterInteraction: () => {},
    end: () => {}
}

const ConstractConfig = async (config: any, loadfile: any) => {
    describe(config.name, async () => {
        before((done) => {
            request.setBaseUrl(config.baseUrl);
            reporter.add(AwesomeReporter);
            done();
        })
        beforeEach(function () {
            test.records("mocha", this)
        });
        const test = spec();
        
        it(`Realizando o teste de contrato - ${config.name}`, async () => {
        
           await (test as any)[config.method](config.path)
                .withRequestTimeout(90000)
                .withCompression()
                .withAuth(config.user, config.pass)
                .withHeaders(config.headers)
                .withBody(config.BodyParams)
                .withForm(config.FormParams)
                .withQueryParams(config.QueryParams)
                .withPathParams(config.PathParams)
                .expectStatus(config.status)
                .expectJsonLike(loadfile)
        });
        
        after(async function (done) {
            done();
        })
    })
    
} 