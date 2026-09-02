import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../fetch/AuthRequests";

export default function PLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setStatus({ type: "", message: "" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.email || !form.senha) {
      setStatus({ type: "error", message: "Informe e-mail e senha." });
      return;
    }

    try {
      setLoading(true);
      await login(form.email, form.senha);
      navigate("/produtos", { replace: true });
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Credenciais inválidas ou servidor indisponível." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <p className="eyebrow">Acesso</p>
          <h2>Entrar no sistema</h2>
        </div>

        {status.type && <div className={`alert alert-${status.type}`}>{status.message}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" />
          </div>

          <div className="login-field">
            <label htmlFor="senha">Senha</label>
            <input id="senha" name="senha" type="password" value={form.senha} onChange={handleChange} placeholder="••••••••" />
          </div>

          <button type="submit" className="btn btn-primary login-button" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
