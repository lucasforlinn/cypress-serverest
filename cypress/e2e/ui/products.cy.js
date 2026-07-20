import { createProductPage, productListPage } from "../../support/pages";
import { buildProduct } from "../../support/factories/product.factory";
import { ROUTES, UI_MESSAGES } from "../../support/constants";

describe("E2E: Cadastro de produto", () => {
  beforeEach(() => {
    cy.seedUser({ admin: true }).then((admin) => cy.loginByApi(admin));
  });

  it("cadastra produto e o exibe na listagem", () => {
    const product = buildProduct();

    createProductPage.visit();
    createProductPage.createProduct(product);

    cy.url().should("include", ROUTES.PRODUCT_LIST);

    productListPage
      .productRowByName(product.nome)
      .should("be.visible")
      .and("contain", product.quantidade);
  });

  it("bloqueia o cadastro quando campos obrigatórios não são preenchidos", () => {
    createProductPage.visit();
    createProductPage.submitForm();

    cy.url().should("include", ROUTES.CREATE_PRODUCT);
    createProductPage.errorAlert(UI_MESSAGES.REQUIRED_PRODUCT_NAME).should("be.visible");
  });
});
