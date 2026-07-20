export const ROUTES = {
  LOGIN: "/login",
  SIGN_UP: "/cadastrarusuarios",
  ADMIN_HOME: "/admin/home",
  CREATE_PRODUCT: "/admin/cadastrarprodutos",
  PRODUCT_LIST: "/admin/listarprodutos",
};

export const API_ENDPOINTS = {
  LOGIN: "/login",
  USERS: "/usuarios",
  PRODUCTS: "/produtos",
  CARTS: "/carrinhos",
};

export const MESSAGES = {
  CREATED: "Cadastro realizado com sucesso",
  UPDATED: "Registro alterado com sucesso",
  DELETED: "Registro excluído com sucesso",
  USER_NOT_FOUND: "Usuário não encontrado",
  INVALID_CREDENTIALS: "Email e/ou senha inválidos",
  EMAIL_ALREADY_USED: "Este email já está sendo usado",
  ADMIN_ONLY: "Rota exclusiva para administradores",
  MISSING_TOKEN: "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais",
  ONE_CART_PER_USER: "Não é permitido ter mais de 1 carrinho",
  USER_HAS_CART: "Não é permitido excluir usuário com carrinho cadastrado",
};

export const UI_MESSAGES = {
  REQUIRED_PRODUCT_NAME: "Nome é obrigatório",
};

export const STORAGE_KEYS = {
  TOKEN: "serverest/userToken",
  NAME: "serverest/userNome",
  EMAIL: "serverest/userEmail",
  PASSWORD: "serverest/userPassword",
};
