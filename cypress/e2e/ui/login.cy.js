import { loginPage } from "../../support/pages";
import { ROUTES, MESSAGES } from "../../support/constants";

describe("E2E: Login", () => {
  let user;

  beforeEach(() => {
    cy.seedUser({ admin: true }).then((created) => {
      user = created;
    });

    loginPage.visit();
  });

  it("autentica usuário administrador e direciona para a home administrativa", () => {
    loginPage.signIn(user.email, user.password);

    cy.url().should("include", ROUTES.ADMIN_HOME);
    cy.contains(`Bem Vindo ${user.nome}`).should("be.visible");
  });

  it("exibe erro e não cria sessão quando a senha está incorreta", () => {
    loginPage.signIn(user.email, "senha-incorreta-123");

    loginPage.errorAlert().should("be.visible").and("contain", MESSAGES.INVALID_CREDENTIALS);
    cy.url().should("include", ROUTES.LOGIN);

    loginPage.storedToken().should("be.null");
  });
});
