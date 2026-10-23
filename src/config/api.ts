// A URL é fornecida pelo .env.local ou pelo ambiente de build da Vercel.
// Quando a variável não existe, usa a API publicada como fallback para não quebrar a tela.
const apiUrl = import.meta.env.VITE_API_URL?.trim() || 'https://api-techforge.onrender.com';

// Evita duas barras ao juntar a URL com caminhos como /produtos.
export const API_URL = apiUrl.replace(/\/+$/, '');