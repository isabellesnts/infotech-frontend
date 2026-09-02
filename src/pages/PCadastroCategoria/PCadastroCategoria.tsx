import { useState } from "react";
import { cadastrarCategoria } from "../../fetch/CategoriaRequests";
import type { CategoriaDTO } from "../../dto/CategoriaDTO";

export default function PCadastroCategoria() {
  const [form, setForm] = useState({ nome: "" });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setStatus({ type: '', message: '' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const categoria: CategoriaDTO = { nome: form.nome };
    const newErrors: Record<string, string> = {};
    if (!form.nome) newErrors.nome = 'Obrigatório';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setStatus({ type: 'error', message: 'Corrija os campos.' });
      return;
    }

    try {
      await cadastrarCategoria(categoria);
      setStatus({ type: 'success', message: 'Categoria cadastrada.' });
      setForm({ nome: '' });
      setErrors({});
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Erro ao cadastrar categoria.' });
    }
  }

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>Cadastrar Categoria</h2>
        {status.type && <div className={`alert alert-${status.type}`}>{status.message}</div>}
        <div className="row form-grid" style={{ gap: 12 }}>
          <div style={{ flex: '1 1 320px' }} className="form-field">
            <input
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              className={errors.nome ? 'input-error' : ''}
              aria-invalid={!!errors.nome}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
          <button type="submit" className="btn btn-primary">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}
