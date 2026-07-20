import { signUpPage } from "../../support/pages";
import { buildUser } from "../../support/factories/user.factory";
import * as api from "../../support/requests";
import { ROUTES, MESSAGES } from "../../support/constants";

describe("E2E: Cadastro de usuário", () => {
  it("cadastra administrador pela interface e já o deixa autenticado", () => {
    const user = buildUser();

    signUpPage.visit();
    signUpPage.signUp(user, { admin: true });

    cy.url().should("include", ROUTES.ADMIN_HOME);
    cy.contains(`Bem Vindo ${user.nome}`).should("be.visible");
  });

  it("impede o cadastro quando o e-mail já está em uso", () => {
    const existing = buildUser();

    api.createUser(existing).then((response) => {
      expect(response.status, "pré-requisito: usuário já cadastrado").to.eq(201);
    });

    signUpPage.visit();
    signUpPage.signUp(existing);

    signUpPage.errorAlert(MESSAGES.EMAIL_ALREADY_USED).should("be.visible");
    cy.url().should("include", ROUTES.SIGN_UP);
  });
});
