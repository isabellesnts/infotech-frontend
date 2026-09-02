import api from "./api"
import type { MovimentacaoDTO } from "../dto/MovimentacaoDTO";

export async function listarMovimentacoes() {
  const response = await api.get("/api/movimentacoes");
  return response.data;
}

export async function cadastrarMovimentacao(movimentacao: MovimentacaoDTO) {
  const response = await api.post("/api/movimentacoes", movimentacao);
  return response.data;
}

export async function atualizarMovimentacao(id: number, movimentacao: MovimentacaoDTO) {
  const response = await api.put(`/api/movimentacoes/${id}`, movimentacao);
  return response.data;
}

export async function excluirMovimentacao(id: number) {
  const response = await api.delete(`/api/movimentacoes/${id}`);
  return response.data;
}
