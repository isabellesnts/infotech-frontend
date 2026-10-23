import { API_URL } from '../config/api';
import api, { unwrapApiData } from "./api"
import type { ProdutoDTO } from "../dto/ProdutoDTO";

export async function listarProdutos() {
  const response = await api.get(`${API_URL}/api/produtos`);
  return unwrapApiData<ProdutoDTO[]>(response.data);
}

export async function cadastrarProduto(produto: ProdutoDTO) {
  const response = await api.post(`${API_URL}/api/produtos`, produto);
  return response.data;
}