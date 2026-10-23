import api, { unwrapApiData } from "./api"
import type { ProdutoDTO } from "../dto/ProdutoDTO";

const produtoEndpoints = ["/api/produtos", "/produtos"];

export async function listarProdutos() {
  let lastError: unknown = null;

  for (const endpoint of produtoEndpoints) {
    try {
      const response = await api.get(endpoint);
      return unwrapApiData<ProdutoDTO[]>(response.data);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Não foi possível listar os produtos.");
}

export async function cadastrarProduto(produto: ProdutoDTO) {
  let lastError: unknown = null;

  for (const endpoint of produtoEndpoints) {
    try {
      const response = await api.post(endpoint, produto);
      return response.data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Não foi possível cadastrar o produto.");
}