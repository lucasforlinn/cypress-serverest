import * as api from "../../support/requests";
import { buildUser } from "../../support/factories/user.factory";
import { MESSAGES } from "../../support/constants";

describe("API: PUT e DELETE /usuarios", () => {
  it("altera os dados do usuário quando o ID existe", () => {
    cy.seedUser({ admin: true }).then((user) => {
      const updated = {
        nome: "Nome Alterado",
        email: user.email,
        password: user.password,
        administrador: "false",
      };

      api.updateUser(user._id, updated).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq(MESSAGES.UPDATED);
      });

      api.getUser(user._id).then((response) => {
        expect(response.body).to.include({
          nome: "Nome Alterado",
          administrador: "false",
          email: user.email,
        });
      });
    });
  });

  it("cadastra um novo usuário quando o ID informado não existe", () => {
    const user = buildUser({ admin: false });

    api.updateUser("idQueNaoExiste00", user).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq(MESSAGES.CREATED);
      expect(response.body._id).to.be.a("string").and.not.be.empty;
    });
  });

  it("impede a exclusão de usuário que possui carrinho cadastrado", () => {
    cy.seedAdminWithToken().then(({ user, token }) => {
      cy.seedProduct(token).then((product) => {
        api.createCart([{ idProduto: product._id, quantidade: 1 }], token).then((cart) => {
          expect(cart.status).to.eq(201);

          api.deleteUser(user._id).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq(MESSAGES.USER_HAS_CART);
            expect(response.body.idCarrinho).to.eq(cart.body._id);
          });
        });
      });
    });
  });

  it("exclui o usuário quando não há carrinho vinculado", () => {
    cy.seedUser({ admin: false }).then((user) => {
      api.deleteUser(user._id).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq(MESSAGES.DELETED);
      });

      api.getUser(user._id).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq(MESSAGES.USER_NOT_FOUND);
      });
    });
  });
});
