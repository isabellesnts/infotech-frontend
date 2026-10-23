import api, { unwrapApiData } from "./api"
import { API_URL } from '../config/api';
import type { MovimentacaoDTO } from "../dto/MovimentacaoDTO";

export async function listarMovimentacoes() {
  const response = await api.get(`${API_URL}/api/movimentacoes`);
  return unwrapApiData<MovimentacaoDTO[]>(response.data);
}

export async function cadastrarMovimentacao(movimentacao: MovimentacaoDTO) {
  const response = await api.post(`${API_URL}/api/movimentacoes`, movimentacao);
  return response.data;
}

export async function atualizarMovimentacao(id: number, movimentacao: MovimentacaoDTO) {
  const response = await api.put(`${API_URL}/api/movimentacoes/${id}`, movimentacao);
  return response.data;
}

export async function excluirMovimentacao(id: number) {
  const response = await api.delete(`${API_URL}/api/movimentacoes/${id}`);
  return response.data;
}
