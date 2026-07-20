import { ROUTES, STORAGE_KEYS } from "../constants";

const SELECTORS = {
  emailInput: '[data-testid="email"]',
  passwordInput: '[data-testid="senha"]',
  submitButton: '[data-testid="entrar"]',
  errorAlert: '[role="alert"]',
};

class LoginPage {
  visit() {
    cy.visit(ROUTES.LOGIN);
  }

  signIn(email, password) {
    cy.get(SELECTORS.emailInput).type(email);
    cy.get(SELECTORS.passwordInput).type(password, { log: false });
    cy.get(SELECTORS.submitButton).click();
  }

  errorAlert = () => cy.get(SELECTORS.errorAlert);

  storedToken() {
    return cy.window().then((win) => win.localStorage.getItem(STORAGE_KEYS.TOKEN));
  }
}

export default new LoginPage();
