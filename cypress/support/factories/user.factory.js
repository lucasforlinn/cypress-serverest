import { faker } from "@faker-js/faker";

export function buildUser({ admin = true } = {}) {
  return {
    nome: faker.person.fullName(),
    email: `${faker.string.uuid()}@qa.com.br`,
    password: faker.internet.password({ length: 12 }),
    administrador: String(admin),
  };
}
