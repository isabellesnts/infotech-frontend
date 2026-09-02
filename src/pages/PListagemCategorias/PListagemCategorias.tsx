import { useEffect, useState } from "react";
import { listarCategorias, excluirCategoria, atualizarCategoria } from "../../fetch/CategoriaRequests";
import type { CategoriaDTO } from "../../dto/CategoriaDTO";

export default function PListagemCategorias() {
  const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);

  useEffect(() => {
    listarCategorias()
      .then(setCategorias)
      .catch((erro) => console.error(erro));
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: 12 }}>Categorias</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((c) => (
                <tr key={c.id_categoria}>
                  <td>{c.id_categoria}</td>
                  <td>{c.nome}</td>
                  <td>
                    <button className="btn" onClick={async () => {
                      const novo = window.prompt('Novo nome:', c.nome);
                      if (novo === null) return;
                      try {
                        await atualizarCategoria(c.id_categoria!, { nome: novo });
                        setCategorias((prev) => prev.map(p => p.id_categoria === c.id_categoria ? { ...p, nome: novo } : p));
                      } catch (err) {
                        console.error(err);
                        alert('Erro ao atualizar categoria');
                      }
                    }}>Editar</button>
                    <button className="btn btn-danger" style={{ marginLeft: 8 }} onClick={async () => {
                      if (!confirm('Excluir categoria?')) return;
                      try {
                        await excluirCategoria(c.id_categoria!);
                        setCategorias((prev) => prev.filter(p => p.id_categoria !== c.id_categoria));
                      } catch (err) {
                        console.error(err);
                        alert('Erro ao excluir categoria');
                      }
                    }}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
