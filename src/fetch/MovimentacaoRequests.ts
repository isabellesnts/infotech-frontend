import api, { unwrapApiData } from "./api"
import type { MovimentacaoDTO } from "../dto/MovimentacaoDTO";

const movimentacaoEndpoints = ["/api/movimentacoes", "/movimentacoes"];

export async function listarMovimentacoes() {
  let lastError: unknown = null;

  for (const endpoint of movimentacaoEndpoints) {
    try {
      const response = await api.get(endpoint);
      return unwrapApiData<MovimentacaoDTO[]>(response.data);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Não foi possível listar as movimentações.");
}

export async function cadastrarMovimentacao(movimentacao: MovimentacaoDTO) {
  let lastError: unknown = null;

  for (const endpoint of movimentacaoEndpoints) {
    try {
      const response = await api.post(endpoint, movimentacao);
      return response.data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Não foi possível cadastrar a movimentação.");
}

export async function atualizarMovimentacao(id: number, movimentacao: MovimentacaoDTO) {
  let lastError: unknown = null;

  for (const endpoint of movimentacaoEndpoints) {
    try {
      const response = await api.put(`${endpoint}/${id}`, movimentacao);
      return response.data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Não foi possível atualizar a movimentação.");
}

export async function excluirMovimentacao(id: number) {
  let lastError: unknown = null;

  for (const endpoint of movimentacaoEndpoints) {
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Não foi possível excluir a movimentação.");
}
