import { ROUTES } from "../constants";

const SELECTORS = {
  nameInput: '[data-testid="nome"]',
  priceInput: '[data-testid="preco"]',
  descriptionTextarea: '[data-testid="descricao"]',
  quantityInput: '[data-testid="quantity"]',
  submitButton: '[data-testid="cadastarProdutos"]',
  errorAlert: '[role="alert"]',
};

class CreateProductPage {
  visit() {
    cy.visit(ROUTES.CREATE_PRODUCT);
  }

  fillProductForm({ nome, preco, descricao, quantidade }) {
    cy.get(SELECTORS.nameInput).type(nome);
    cy.get(SELECTORS.priceInput).type(String(preco));
    cy.get(SELECTORS.descriptionTextarea).type(descricao);
    cy.get(SELECTORS.quantityInput).type(String(quantidade));
  }

  submitForm() {
    cy.get(SELECTORS.submitButton).click();
  }

  createProduct(product) {
    this.fillProductForm(product);
    this.submitForm();
  }

  errorAlert = (text) => cy.contains(SELECTORS.errorAlert, text);
}

export default new CreateProductPage();
