import * as api from "../../support/requests";
import { MESSAGES } from "../../support/constants";

describe("API: GET /produtos — efeito do carrinho sobre o estoque", () => {
  const INITIAL_STOCK = 50;
  const PURCHASED = 3;

  let token;
  let product;

  beforeEach(() => {
    cy.seedAdminWithToken().then(({ token: adminToken }) => {
      token = adminToken;

      cy.seedProduct(adminToken, { quantidade: INITIAL_STOCK }).then((created) => {
        product = created;
      });
    });
  });

  it("debita do estoque exatamente a quantidade comprada", () => {
    api.getProduct(product._id).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.quantidade, "estoque antes da compra").to.eq(INITIAL_STOCK);
    });

    api.createCart([{ idProduto: product._id, quantidade: PURCHASED }], token).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq(MESSAGES.CREATED);
    });

    api.getProduct(product._id).then((response) => {
      expect(response.body.quantidade, "estoque após a compra").to.eq(INITIAL_STOCK - PURCHASED);
    });
  });

  it("rejeita um segundo carrinho para o mesmo usuário", () => {
    api.createCart([{ idProduto: product._id, quantidade: 1 }], token).then((first) => {
      expect(first.status).to.eq(201);
    });

    api.createCart([{ idProduto: product._id, quantidade: 1 }], token).then((second) => {
      expect(second.status).to.eq(400);
      expect(second.body.message).to.eq(MESSAGES.ONE_CART_PER_USER);
    });
  });
});
