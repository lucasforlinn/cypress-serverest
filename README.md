# cypress-serverest

> Suíte de testes automatizados de **interface e API** para o [ServeRest](https://serverest.dev), construída com Cypress e JavaScript.

[![Tests](https://github.com/lucasforlinn/cypress-serverest/actions/workflows/tests.yml/badge.svg)](https://github.com/lucasforlinn/cypress-serverest/actions/workflows/tests.yml)
[![Cypress](https://img.shields.io/badge/Cypress-15-17202C?logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Node](https://img.shields.io/badge/Node-%3E%3D20-5FA04E?logo=node.js&logoColor=white)](https://nodejs.org/)

---

## Sobre o projeto

O [ServeRest](https://serverest.dev) é uma API REST com interface web, criada para servir de alvo em estudos de automação. Simula um e-commerce com usuários, produtos e carrinhos.

Esta suíte cobre as duas camadas de forma integrada: os testes de API validam contrato e regras de negócio direto no backend, enquanto os testes de interface exercitam a jornada do usuário no navegador. Onde faz sentido, a API é usada para **preparar o estado** dos testes de UI, evitando percorrer telas que não são o objeto do teste.

**Aplicações sob teste**

| Camada        | URL                         |
| ------------- | --------------------------- |
| Frontend      | https://front.serverest.dev |
| API / Swagger | https://serverest.dev       |

**Números**

|                   |                                     |
| ----------------- | ----------------------------------- |
| Testes            | 15 (9 de API, 6 de interface)       |
| Tempo de execução | ~30s a suíte completa, ~5s só a API |
| Massa de dados    | 100% dinâmica, gerada por Faker     |

## Stack

| Ferramenta                                                                                                     | Papel                                   |
| -------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| [Cypress](https://www.cypress.io/) 15                                                                          | Execução dos testes de UI e de API      |
| [Faker](https://fakerjs.dev/)                                                                                  | Geração de massa dinâmica               |
| [Mochawesome](https://github.com/LironEr/cypress-mochawesome-reporter)                                         | Relatório HTML de execução              |
| [ESLint](https://eslint.org/) + [`eslint-plugin-cypress`](https://github.com/cypress-io/eslint-plugin-cypress) | Análise estática, com regras anti-flaky |
| [Prettier](https://prettier.io/)                                                                               | Formatação                              |
| GitHub Actions                                                                                                 | Integração contínua                     |

## Pré-requisitos

- **Node.js 20 ou superior**

Não é necessário subir banco, container ou variável de ambiente: os testes apontam para a instância pública do ServeRest por padrão.

## Instalação

```bash
git clone https://github.com/lucasforlinn/cypress-serverest.git
cd cypress-serverest
npm ci
```

## Executando os testes

```bash
npm test              # suíte completa
npm run test:api      # apenas os testes de API (sem navegador)
npm run test:e2e      # apenas os testes de interface
npm run cy:open       # modo interativo (Cypress App)
npm run test:report   # abre o relatório HTML da última execução
```

Qualidade de código:

```bash
npm run lint          # ESLint
npm run lint:fix      # ESLint com correção automática
npm run format        # Prettier
npm run format:check  # Prettier em modo verificação (usado no CI)
```

## Cenários de teste

### API

Cada cenário cobre um **verbo HTTP**, escolhido pelo que aquele verbo prova melhor no domínio do ServeRest.

| Spec                 | Verbo            | O que valida                                                                                                                              |
| -------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `api/products.cy.js` | `POST`           | Camadas de autorização: sem token → `401`, autenticado sem perfil admin → `403`, admin → `201` com persistência confirmada                |
| `api/carts.cy.js`    | `GET`            | O cadastro de carrinho **debita o estoque** do produto, efeito que a resposta do `POST` não revela; e o limite de um carrinho por usuário |
| `api/users.cy.js`    | `PUT` / `DELETE` | Alteração retorna `200`; ID inexistente **cadastra** em vez de falhar (`201`); exclusão bloqueada quando há carrinho vinculado            |

### Interface

| Spec                | O que valida                                                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `ui/signup.cy.js`   | Cadastro pelo formulário → usuário autenticado na área administrativa; e-mail já em uso → erro exibido                 |
| `ui/login.cy.js`    | Login de administrador → home administrativa; senha incorreta → erro exibido **e nenhum token gravado**                |
| `ui/products.cy.js` | Cadastro de produto com sessão injetada via API → produto na listagem; campos obrigatórios vazios → cadastro bloqueado |

A cobertura é intencionalmente assimétrica: regra de negócio e contrato ficam nos testes de API, que rodam em segundos e apontam a falha com precisão. A interface cobre o que só o navegador prova: renderização, navegação e estado da sessão.

## Estrutura do projeto

```
cypress/
├── e2e/
│   ├── api/                  # specs de API (cy.request, sem navegador)
│   └── ui/                   # specs de interface
├── support/
│   ├── constants.js          # rotas, endpoints e mensagens do ServeRest
│   ├── commands/             # comandos transversais: seed de massa e sessão
│   ├── pages/                # Page Objects, um por tela
│   ├── requests/             # um wrapper por endpoint da API
│   └── factories/            # geração de massa com Faker
.github/workflows/tests.yml   # pipeline de CI
```

## Arquitetura

**Page Objects e Custom Commands convivem, com fronteira explícita:**

> Pertence a uma tela → **Page Object**.
> Atravessa telas, ou é preparação de estado → **Custom Command**.

Cada Page Object concentra os seletores de uma tela em um mapa `SELECTORS` e expõe métodos que descrevem a ação (`fillProductForm`, `submitForm`, `createProduct`). **Nenhum seletor aparece nas specs.** Os custom commands cuidam do que não pertence a tela alguma: `cy.seedUser()`, `cy.seedProduct()`, `cy.loginByApi()`.

**Isolamento de dados.** Nenhum dado vem de arquivo estático: tudo é gerado por Faker com sufixo único, e cada teste cria a massa de que precisa. Nenhum teste depende de dado pré-existente nem do resultado de outro. O critério de aceite é `npm test` passar **duas vezes seguidas** sem limpar nada, o que importa num ambiente público e compartilhado como o ServeRest.

**Convenções travadas por lint.** As regras do `eslint-plugin-cypress` transformam decisões de arquitetura em erro de build: sem `cy.wait()` com tempo fixo, sem XPath, sem atribuir retorno de comando a variável, sem resíduo de `cy.debug()`.

## Relatórios e evidências

O [Mochawesome](https://github.com/LironEr/cypress-mochawesome-reporter) gera um relatório HTML em `cypress/reports/index.html` a cada execução, com gráficos e screenshots embutidos.

Screenshots são capturados **automaticamente em caso de falha**, inclusive de cada tentativa, já que o CI reexecuta testes que falham.

## Integração contínua

O [pipeline](.github/workflows/tests.yml) roda a cada `push` na `main` e em todo pull request, em dois estágios:

1. **Lint**: ESLint e verificação de formatação. Quebra de padrão falha em segundos, sem consumir os minutos da suíte.
2. **Cypress**: suíte completa no Chrome, com `retries` para absorver instabilidade pontual da instância pública.

Relatório e screenshots ficam disponíveis como artefatos para download, **inclusive quando a suíte falha**, que é justamente quando são necessários.
