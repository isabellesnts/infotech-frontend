import { useState } from "react";
import { cadastrarMovimentacao } from "../../fetch/MovimentacaoRequests";
import type { MovimentacaoDTO } from "../../dto/MovimentacaoDTO";

export default function PCadastroMovimentacao() {
  const [form, setForm] = useState({
    id_produto: '',
    id_movimentacao_origem: '',
    tipo: '',
    motivo: '',
    quantidade: '',
    preco_unitario_praticado: '',
    valor_total: '',
    observacao: '',
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setStatus({ type: '', message: '' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const mov: MovimentacaoDTO = {
      id_produto: Number(form.id_produto),
      id_movimentacao_origem: form.id_movimentacao_origem ? Number(form.id_movimentacao_origem) : null,
      tipo: form.tipo,
      motivo: form.motivo,
      quantidade: Number(form.quantidade),
      preco_unitario_praticado: form.preco_unitario_praticado ? Number(form.preco_unitario_praticado) : null,
      valor_total: form.valor_total ? Number(form.valor_total) : null,
      observacao: form.observacao,
    };

    const newErrors: Record<string, string> = {};
    if (!form.id_produto || Number.isNaN(Number(form.id_produto))) newErrors.id_produto = 'Número inválido';
    if (!form.tipo) newErrors.tipo = 'Obrigatório';
    if (!form.motivo) newErrors.motivo = 'Obrigatório';
    if (!form.quantidade || Number.isNaN(Number(form.quantidade))) newErrors.quantidade = 'Número inválido';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setStatus({ type: 'error', message: 'Corrija os campos.' });
      return;
    }

    try {
      await cadastrarMovimentacao(mov);
      setStatus({ type: 'success', message: 'Movimentação cadastrada.' });
      setForm({ id_produto: '', id_movimentacao_origem: '', tipo: '', motivo: '', quantidade: '', preco_unitario_praticado: '', valor_total: '', observacao: '' });
      setErrors({});
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Erro ao cadastrar movimentação.' });
    }
  }

  return (
    <div className="form-shell">
      <form className="card form-card" onSubmit={handleSubmit}>
        <div className="card-header">
          <div>
            <p className="eyebrow">Operações</p>
            <h2>Cadastrar movimentação</h2>
          </div>
          <span className="status-pill">Estoque</span>
        </div>

        {status.type && <div className={`alert alert-${status.type}`}>{status.message}</div>}

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="id_produto">ID do produto</label>
            <input id="id_produto" name="id_produto" value={form.id_produto} onChange={handleChange} className={errors.id_produto ? 'input-error' : ''} placeholder="Ex: 12" />
          </div>

          <div className="form-field">
            <label htmlFor="id_movimentacao_origem">Origem</label>
            <input id="id_movimentacao_origem" name="id_movimentacao_origem" value={form.id_movimentacao_origem} onChange={handleChange} placeholder="Opcional" />
          </div>

          <div className="form-field">
            <label htmlFor="tipo">Tipo</label>
            <select id="tipo" name="tipo" value={form.tipo} onChange={handleChange} className={errors.tipo ? 'input-error' : ''}>
              <option value="">Selecione</option>
              <option value="ENTRADA">ENTRADA</option>
              <option value="SAIDA">SAÍDA</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="motivo">Motivo</label>
            <input id="motivo" name="motivo" value={form.motivo} onChange={handleChange} className={errors.motivo ? 'input-error' : ''} placeholder="Ex: Compra, venda, ajuste" />
          </div>

          <div className="form-field">
            <label htmlFor="quantidade">Quantidade</label>
            <input id="quantidade" name="quantidade" value={form.quantidade} onChange={handleChange} className={errors.quantidade ? 'input-error' : ''} placeholder="Ex: 10" />
          </div>

          <div className="form-field">
            <label htmlFor="preco_unitario_praticado">Preço unitário praticado</label>
            <input id="preco_unitario_praticado" name="preco_unitario_praticado" value={form.preco_unitario_praticado} onChange={handleChange} placeholder="Opcional" />
          </div>

          <div className="form-field">
            <label htmlFor="valor_total">Valor total</label>
            <input id="valor_total" name="valor_total" value={form.valor_total} onChange={handleChange} placeholder="Opcional" />
          </div>

          <div className="form-field form-field--wide">
            <label htmlFor="observacao">Observação</label>
            <input id="observacao" name="observacao" value={form.observacao} onChange={handleChange} placeholder="Detalhes da movimentação" />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}
