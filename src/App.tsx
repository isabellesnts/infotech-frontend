import { NavLink, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import PCadastroProduto from "./pages/PCadastroProduto/PCadastroProduto";
import PListagemProdutos from "./pages/PListagemProdutos/PListagemProdutos";
import PCadastroCategoria from "./pages/PCadastroCategoria/PCadastroCategoria";
import PListagemCategorias from "./pages/PListagemCategorias/PListagemCategorias";
import PCadastroMovimentacao from "./pages/PCadastroMovimentacao/PCadastroMovimentacao";
import PListagemMovimentacoes from "./pages/PListagemMovimentacoes/PListagemMovimentacoes";
import PLogin from "./pages/PLogin/PLogin";
import { logout } from "./fetch/AuthRequests";

function Dashboard() {
  return (
    <div className="card">
      <h2>Bem-vindo ao painel</h2>
      <p className="muted">Use os botões acima para navegar entre Produtos, Categorias e Movimentações.</p>
    </div>
  )
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("auth_token");
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="page container">
      <header className="topbar">
        <div className="brand">Infotech — Gestão de Produtos</div>
        <nav className="nav">
          <NavLink to="/produtos" className={({isActive}) => isActive ? 'nav-button active' : 'nav-button'}>Produtos</NavLink>
          <NavLink to="/categorias" className={({isActive}) => isActive ? 'nav-button active' : 'nav-button'}>Categorias</NavLink>
          <NavLink to="/movimentacoes" className={({isActive}) => isActive ? 'nav-button active' : 'nav-button'}>Movimentações</NavLink>
        </nav>
        <div className="spacer" />
        <button type="button" className="nav-button nav-logout" onClick={handleLogout}>Sair</button>
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
      <Route path="/login" element={<PLogin />} />
      <Route path="/*" element={<RequireAuth><AppLayout /></RequireAuth>} />
    </Routes>
  );
}

export default App;