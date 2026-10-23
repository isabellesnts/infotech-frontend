import api, { unwrapApiData } from "./api"
import type { CategoriaDTO } from "../dto/CategoriaDTO";

const categoriaEndpoints = ["/api/categorias", "/categorias"];

export async function listarCategorias() {
  let lastError: unknown = null;

  for (const endpoint of categoriaEndpoints) {
    try {
      const response = await api.get(endpoint);
      return unwrapApiData<CategoriaDTO[]>(response.data);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Não foi possível listar as categorias.");
}

export async function cadastrarCategoria(categoria: CategoriaDTO) {
  let lastError: unknown = null;

  for (const endpoint of categoriaEndpoints) {
    try {
      const response = await api.post(endpoint, categoria);
      return response.data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Não foi possível cadastrar a categoria.");
}

export async function atualizarCategoria(id: number, categoria: CategoriaDTO) {
  let lastError: unknown = null;

  for (const endpoint of categoriaEndpoints) {
    try {
      const response = await api.put(`${endpoint}/${id}`, categoria);
      return response.data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Não foi possível atualizar a categoria.");
}

export async function excluirCategoria(id: number) {
  let lastError: unknown = null;

  for (const endpoint of categoriaEndpoints) {
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Não foi possível excluir a categoria.");
}
