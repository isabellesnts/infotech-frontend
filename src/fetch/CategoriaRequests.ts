import api, { unwrapApiData } from "./api"
import { API_URL } from '../config/api';
import type { CategoriaDTO } from "../dto/CategoriaDTO";

export async function listarCategorias() {
  const response = await api.get(`${API_URL}/api/categorias`);
  return unwrapApiData<CategoriaDTO[]>(response.data);
}

export async function cadastrarCategoria(categoria: CategoriaDTO) {
  const response = await api.post(`${API_URL}/api/categorias`, categoria);
  return response.data;
}

export async function atualizarCategoria(id: number, categoria: CategoriaDTO) {
  const response = await api.put(`${API_URL}/api/categorias/${id}`, categoria);
  return response.data;
}

export async function excluirCategoria(id: number) {
  const response = await api.delete(`${API_URL}/api/categorias/${id}`);
  return response.data;
}
