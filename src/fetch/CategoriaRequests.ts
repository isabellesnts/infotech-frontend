import api from "./api"
import type { CategoriaDTO } from "../dto/CategoriaDTO";

export async function listarCategorias() {
  const response = await api.get("/api/categorias");
  return response.data;
}

export async function cadastrarCategoria(categoria: CategoriaDTO) {
  const response = await api.post("/api/categorias", categoria);
  return response.data;
}

export async function atualizarCategoria(id: number, categoria: CategoriaDTO) {
  const response = await api.put(`/api/categorias/${id}`, categoria);
  return response.data;
}

export async function excluirCategoria(id: number) {
  const response = await api.delete(`/api/categorias/${id}`);
  return response.data;
}
