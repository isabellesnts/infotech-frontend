import axios from "axios";
import { API_URL } from '../config/api';

const api = axios.create({
  baseURL: API_URL,
});

export function unwrapApiData<T>(payload: unknown): T {
  if (Array.isArray(payload)) {
    return payload as T;
  }

  if (payload && typeof payload === "object") {
    const data = payload as Record<string, unknown>;
    const candidates = ["data", "result", "results", "items", "dados", "produtos", "categorias", "movimentacoes"];

    for (const key of candidates) {
      const value = data[key];
      if (Array.isArray(value)) {
        return value as T;
      }
    }
  }

  return payload as T;
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }

    return Promise.reject(error);
  }
);

export default api;