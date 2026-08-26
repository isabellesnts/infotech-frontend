import PCadastroProduto from "./pages/PCadastroProduto/PCadastroProduto";
import PListagemProdutos from "./pages/PListagemProdutos/PListagemProdutos";

function App() {
  return (
    <div className="page container">
      <header className="topbar">
        <div className="brand">Infotech — Gestão de Produtos</div>
        <div className="spacer" />
        <div className="muted">Painel</div>
      </header>

      <main style={{ display: 'grid', gap: 18 }}>
        <PCadastroProduto />
        <PListagemProdutos />
      </main>
    </div>
  );
}

export default App;