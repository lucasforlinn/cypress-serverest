import { ROUTES } from "../constants";

const SELECTORS = {
  nameInput: '[data-testid="nome"]',
  emailInput: '[data-testid="email"]',
  passwordInput: '[data-testid="password"]',
  adminCheckbox: '[data-testid="checkbox"]',
  submitButton: '[data-testid="cadastrar"]',
  errorAlert: '[role="alert"]',
};

class SignUpPage {
  visit() {
    cy.visit(ROUTES.SIGN_UP);
  }

  fillSignUpForm({ nome, email, password }, { admin = false } = {}) {
    cy.get(SELECTORS.nameInput).type(nome);
    cy.get(SELECTORS.emailInput).type(email);
    cy.get(SELECTORS.passwordInput).type(password, { log: false });

    if (admin) {
      cy.get(SELECTORS.adminCheckbox).check();
    }
  }

  submitForm() {
    cy.get(SELECTORS.submitButton).click();
  }

  signUp(user, options) {
    this.fillSignUpForm(user, options);
    this.submitForm();
  }

  errorAlert = (text) => cy.contains(SELECTORS.errorAlert, text);
}

export default new SignUpPage();
