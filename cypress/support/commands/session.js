import * as api from "../requests";
import { ROUTES, STORAGE_KEYS } from "../constants";

Cypress.Commands.add("loginByApi", (user) => {
  cy.session(user.email, () => {
    api.login(user.email, user.password).then((response) => {
      expect(response.status, "login via API").to.eq(200);

      cy.visit(ROUTES.LOGIN);
      cy.window().then((win) => {
        win.localStorage.setItem(STORAGE_KEYS.TOKEN, response.body.authorization);
        win.localStorage.setItem(STORAGE_KEYS.NAME, user.nome);
        win.localStorage.setItem(STORAGE_KEYS.EMAIL, user.email);
        win.localStorage.setItem(STORAGE_KEYS.PASSWORD, user.password);
      });
    });
  });
});
