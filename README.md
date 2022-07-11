# PactumJS

![Build](https://github.com/pactumjs/pactum/workflows/Build/badge.svg?branch=master)
![Coverage](https://img.shields.io/codeclimate/coverage/ASaiAnudeep/pactum)
![Downloads](https://img.shields.io/npm/dt/pactum)
![Size](https://img.shields.io/bundlephobia/minzip/pactum)
![Platform](https://img.shields.io/node/v/pactum)

[![Stars](https://img.shields.io/github/stars/pactumjs/pactum?style=social)](https://github.com/pactumjs/pactum/stargazers)
[![Twitter](https://img.shields.io/twitter/follow/pactumjs?label=Follow&style=social)](https://twitter.com/pactumjs)


## Instalação

```shell
# instalação das dependecias do projeto
npm install

# Rodar os testes
npm run test
```

## Introdução

Utilizamos o  **pactumjs** para criar nossos testes de api, e usamos um arquivo json para utilizamos como parametros de configuracao, assim facilitando a implementacao do caso de testes para os times e inclusao de CI/CD

### JsonConfiguração

``` json
[
    {
        "baseurl": "https://jsonplaceholder.typicode.com",
        "Method": "GET",
        "Path": "/todos/{userId}",
        "QueryParams": { "": "" },
        "Headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "PathParams": { "userId": 1 },
        "user": "",
        "pass": "",
        "Status": 200,
        "JsonLike": {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        },
        "name": "Teste 1 TODOS userID",
        "api": "jsonplaceholder"
    },

    {
        "baseurl": "https://jsonplaceholder.typicode.com",
        "Method": "GET",
        "Path": "/todos/{userId}",
        "QueryParams": { "": "" },
        "Headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "PathParams": { "userId": 1 },
        "user": "",
        "pass": "",
        "Status": 200,
        "JsonLike": {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        },
        "name": "Teste 2 TODOS userID",
        "api": "jsonplaceholder"
    }
]

```


### Reporter

``` js
//api.spec.js
const { spec, request,reporter } = require("pactum");
const addContext = require("mochawesome/addContext");
const pactconfig = require("../../support/parameters.json");

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

```

### Caso de teste simples

#### Usando Mocha com reporter

Rodando uma simples aplicação e verificando os dados essperados.

```js
//api.spec.js
for (const config of pactconfig) {
    describe(`Teste de Api do tipo de requisição ${config.Method} do time - ${config.name}`, async () => {
        before(() => {
            request.setBaseUrl(config.baseurl);
            reporter.add(awesome_reporter);
        });
        beforeEach(function () {
            // const _spec = spec();
            test.records("mocha", this);
        });
        const test = spec();
it(`Iniciando a request da api - ${config.api}`, async () => {
            await test
                .withPath(config.Path)
                .withMethod(config.Method)
                .withQueryParams(config.QueryParams)
                .withHeaders(config.Headers)
                .withPathParams(config.PathParams)
                .withAuth(config.user, config.pass)
                .expectStatus(config.Status)
                .expectJsonLike(config.JsonLike);
        });
```
## Suporte

Para maiores informaçoes consultem o repo oficial da aplicação https://pactumjs.github.io

- [API Testing](https://pactumjs.github.io/guides/api-testing)
- [Integration Testing](https://pactumjs.github.io/guides/integration-testing)
- [Component Testing](https://pactumjs.github.io/guides/component-testing)
- [Contract Testing](https://pactumjs.github.io/guides/contract-testing)
- [E2E Testing](https://pactumjs.github.io/guides/e2e-testing)
- [Mock Server](https://pactumjs.github.io/guides/mock-server)
