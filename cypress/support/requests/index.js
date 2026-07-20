import { API_ENDPOINTS } from "../constants";

function apiRequest({ method, path, body, token }) {
  return cy.request({
    method,
    url: `${Cypress.env("apiUrl")}${path}`,
    body,
    headers: token ? { Authorization: token } : undefined,
    failOnStatusCode: false,
  });
}

export const login = (email, password) =>
  apiRequest({
    method: "POST",
    path: API_ENDPOINTS.LOGIN,
    body: { email, password },
  });

export const createUser = (user) =>
  apiRequest({ method: "POST", path: API_ENDPOINTS.USERS, body: user });

export const getUser = (id) => apiRequest({ method: "GET", path: `${API_ENDPOINTS.USERS}/${id}` });

export const updateUser = (id, user) =>
  apiRequest({ method: "PUT", path: `${API_ENDPOINTS.USERS}/${id}`, body: user });

export const deleteUser = (id) =>
  apiRequest({ method: "DELETE", path: `${API_ENDPOINTS.USERS}/${id}` });

export const createProduct = (product, token) =>
  apiRequest({
    method: "POST",
    path: API_ENDPOINTS.PRODUCTS,
    body: product,
    token,
  });

export const getProduct = (id) =>
  apiRequest({ method: "GET", path: `${API_ENDPOINTS.PRODUCTS}/${id}` });

export const createCart = (products, token) =>
  apiRequest({
    method: "POST",
    path: API_ENDPOINTS.CARTS,
    body: { produtos: products },
    token,
  });
