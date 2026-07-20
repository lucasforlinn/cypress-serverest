import { buildUser } from "../factories/user.factory";
import { buildProduct } from "../factories/product.factory";
import * as api from "../requests";

Cypress.Commands.add("seedUser", ({ admin = true } = {}) => {
  const user = buildUser({ admin });

  return api.createUser(user).then((response) => {
    expect(response.status, "seed: cadastro de usuário").to.eq(201);

    return { ...user, _id: response.body._id };
  });
});

Cypress.Commands.add("seedToken", (user) =>
  api.login(user.email, user.password).then((response) => {
    expect(response.status, "seed: login").to.eq(200);

    return response.body.authorization;
  }),
);

Cypress.Commands.add("seedProduct", (token, overrides = {}) => {
  const product = buildProduct(overrides);

  return api.createProduct(product, token).then((response) => {
    expect(response.status, "seed: cadastro de produto").to.eq(201);

    return { ...product, _id: response.body._id };
  });
});

Cypress.Commands.add("seedAdminWithToken", () =>
  cy
    .seedUser({ admin: true })
    .then((user) => cy.seedToken(user).then((token) => ({ user, token }))),
);
