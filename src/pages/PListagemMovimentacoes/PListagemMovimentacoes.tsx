import { useEffect, useState } from "react";
import { listarMovimentacoes, excluirMovimentacao, atualizarMovimentacao } from "../../fetch/MovimentacaoRequests";
import type { MovimentacaoDTO } from "../../dto/MovimentacaoDTO";

export default function PListagemMovimentacoes() {
  const [movs, setMovs] = useState<MovimentacaoDTO[]>([]);

  useEffect(() => {
    listarMovimentacoes()
      .then(setMovs)
      .catch((erro) => console.error(erro));
  }, []);

  const listaMovimentacoes = Array.isArray(movs) ? movs : [];

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Registros</p>
          <h2>Movimentações</h2>
        </div>
        <span className="status-pill">Lista</span>
      </div>

      <div style={{ overflowX: 'auto', marginTop: 18 }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Produto</th>
              <th>Tipo</th>
              <th>Motivo</th>
              <th>Quantidade</th>
              <th>Preço Unit.</th>
              <th>Valor Total</th>
              <th>Observação</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaMovimentacoes.map((m) => (
              <tr key={m.id_movimentacao}>
                <td>{m.id_movimentacao}</td>
                <td>{m.id_produto}</td>
                <td>{m.tipo}</td>
                <td>{m.motivo}</td>
                <td>{m.quantidade}</td>
                <td>{m.preco_unitario_praticado}</td>
                <td>{m.valor_total}</td>
                <td>{m.observacao}</td>
                <td>{m.data_movimentacao}</td>
                <td>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button className="btn" onClick={async () => {
                      const novoMotivo = window.prompt('Novo motivo:', m.motivo);
                      if (novoMotivo === null) return;
                      try {
                        await atualizarMovimentacao(m.id_movimentacao!, { ...m, motivo: novoMotivo });
                        setMovs((prev) => Array.isArray(prev) ? prev.map(x => x.id_movimentacao === m.id_movimentacao ? { ...x, motivo: novoMotivo } : x) : prev);
                      } catch (err) {
                        console.error(err);
                        alert('Erro ao atualizar movimentação');
                      }
                    }}>Editar</button>
                    <button className="btn btn-danger" onClick={async () => {
                      if (!confirm('Excluir movimentação?')) return;
                      try {
                        await excluirMovimentacao(m.id_movimentacao!);
                        setMovs((prev) => Array.isArray(prev) ? prev.filter(x => x.id_movimentacao !== m.id_movimentacao) : prev);
                      } catch (err) {
                        console.error(err);
                        alert('Erro ao excluir movimentação');
                      }
                    }}>Excluir</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
