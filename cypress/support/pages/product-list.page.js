import { ROUTES } from "../constants";

const SELECTORS = {
  productsTable: "table",
  row: "tr",
};

class ProductListPage {
  visit() {
    cy.visit(ROUTES.PRODUCT_LIST);
  }

  productsTable = () => cy.get(SELECTORS.productsTable);

  productRowByName(name) {
    return this.productsTable().contains(SELECTORS.row, name);
  }
}

export default new ProductListPage();
