import { NavLink, Routes, Route } from 'react-router-dom'
import PCadastroProduto from "./pages/PCadastroProduto/PCadastroProduto";
import PListagemProdutos from "./pages/PListagemProdutos/PListagemProdutos";
import PCadastroCategoria from "./pages/PCadastroCategoria/PCadastroCategoria";
import PListagemCategorias from "./pages/PListagemCategorias/PListagemCategorias";
import PCadastroMovimentacao from "./pages/PCadastroMovimentacao/PCadastroMovimentacao";
import PListagemMovimentacoes from "./pages/PListagemMovimentacoes/PListagemMovimentacoes";

function Dashboard() {
  return (
    <div className="card dashboard-card">
      <div className="dashboard-content">
        <p className="eyebrow">Início</p>
        <h2>Bem-vindo ao site Infotech</h2>
        <p className="muted dashboard-text">
          Explore o painel, acompanhe seus produtos, categorias e movimentações com facilidade e organização.
        </p>
      </div>
    </div>
  )
}

function AppLayout() {
  return (
    <div className="page container">
      <header className="topbar">
        <div className="brand">Infotech — Gestão de Produtos</div>
        <nav className="nav">
          <NavLink to="/" end className={({isActive}) => isActive ? 'nav-button active' : 'nav-button'}>Início</NavLink>
          <NavLink to="/produtos" className={({isActive}) => isActive ? 'nav-button active' : 'nav-button'}>Produtos</NavLink>
          <NavLink to="/categorias" className={({isActive}) => isActive ? 'nav-button active' : 'nav-button'}>Categorias</NavLink>
          <NavLink to="/movimentacoes" className={({isActive}) => isActive ? 'nav-button active' : 'nav-button'}>Movimentações</NavLink>
        </nav>
        <div className="spacer" />
      </header>

      <main style={{ display: 'grid', gap: 18 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/produtos" element={<>
            <PCadastroProduto />
            <PListagemProdutos />
          </>} />
          <Route path="/categorias" element={<>
            <PCadastroCategoria />
            <PListagemCategorias />
          </>} />
          <Route path="/movimentacoes" element={
            <div className="route-stack">
              <PCadastroMovimentacao />
              <PListagemMovimentacoes />
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/*" element={<AppLayout />} />
    </Routes>
  );
}

export default App;