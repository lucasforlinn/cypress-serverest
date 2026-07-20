import * as api from "../../support/requests";
import { buildProduct } from "../../support/factories/product.factory";
import { MESSAGES } from "../../support/constants";

describe("API: POST /produtos — camadas de autorização", () => {
  it("rejeita o cadastro sem token de autenticação", () => {
    api.createProduct(buildProduct()).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq(MESSAGES.MISSING_TOKEN);
    });
  });

  it("rejeita o cadastro por usuário autenticado sem perfil de administrador", () => {
    cy.seedUser({ admin: false })
      .then((user) => cy.seedToken(user))
      .then((token) => api.createProduct(buildProduct(), token))
      .then((response) => {
        expect(response.status).to.eq(403);
        expect(response.body.message).to.eq(MESSAGES.ADMIN_ONLY);
      });
  });

  it("cadastra o produto e o persiste quando o usuário é administrador", () => {
    const product = buildProduct();

    cy.seedAdminWithToken().then(({ token }) => {
      api.createProduct(product, token).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq(MESSAGES.CREATED);

        api.getProduct(response.body._id).then((created) => {
          expect(created.status).to.eq(200);
          expect(created.body).to.include({
            nome: product.nome,
            preco: product.preco,
            descricao: product.descricao,
            quantidade: product.quantidade,
          });
        });
      });
    });
  });
});
