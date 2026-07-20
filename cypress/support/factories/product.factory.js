import { faker } from "@faker-js/faker";

export function buildProduct(overrides = {}) {
  return {
    nome: `${faker.commerce.productName()} ${faker.string.uuid()}`,
    preco: faker.number.int({ min: 10, max: 5000 }),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({ min: 20, max: 100 }),
    ...overrides,
  };
}
