import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://ronaldo-dscatalog.herokuapp.com",
});

export const TOKEN = "Basic ZHNjYXRhbG9nOmRzY2F0YWxvZzEyMw==";

export async function userToken() {
  const token = await AsyncStorage.getItem("@token");
  return token;
}

export function getProducts() {
  const res = api.get(
    `/products?linesPerPage=9999999&direction=DESC&orderBy=id`
  );
  return res;
}

export function getCategories() {
  const res = api.get(`/categories?direction=DESC&orderBy=name`);
  return res;
}

export async function createProduct(data: object) {
  const authToken = await userToken();
  const res = api.post(`/products`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return res;
}

export async function deleteProduct(id: number) {
  const authToken = await userToken();
  const res = api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

export async function findById(id: number) {
  const res = await api.get(`/products/${id}`);
  return res;
}

export async function updateProduct(data: object) {
  const authToken = await userToken();
  const res = await api.put(`/products/${data.id}`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return res;
}
