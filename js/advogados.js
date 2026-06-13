const ADVOGADOS = [
  {
    nome: "Dra. Ana Machava",
    especialidade: "Direito do Trabalho",
    provincia: "Maputo",
    anos: 12,
    telefone: "258841000001",
    email: "ana.machava@email.com",
    descricao: "Especialista em relações laborais, despedimentos e negociações colectivas. Mais de 500 casos resolvidos.",
    linguas: ["Português", "Inglês", "Changana"],
    avaliacao: 5,
    disponivel: true
  },
  {
    nome: "Dr. Carlos Mondlane",
    especialidade: "Direito Penal",
    provincia: "Maputo",
    anos: 8,
    telefone: "258841000002",
    email: "carlos.mondlane@email.com",
    descricao: "Defensor em processos criminais, crimes económicos e direitos dos arguidos. Ex-procurador da República.",
    linguas: ["Português", "Inglês"],
    avaliacao: 4,
    disponivel: true
  },
  {
    nome: "Dra. Fátima Sitoe",
    especialidade: "Direito de Família",
    provincia: "Sofala",
    anos: 6,
    telefone: "258841000003",
    email: "fatima.sitoe@email.com",
    descricao: "Especialista em divórcios, custódia de menores e partilha de bens. Abordagem humanizada e discreta.",
    linguas: ["Português", "Sena"],
    avaliacao: 5,
    disponivel: false
  },
  {
    nome: "Dr. João Tembe",
    especialidade: "Direito Comercial",
    provincia: "Nampula",
    anos: 15,
    telefone: "258841000004",
    email: "joao.tembe@email.com",
    descricao: "Consultor jurídico de empresas, contratos comerciais, fusões e propriedade intelectual.",
    linguas: ["Português", "Inglês", "Francês"],
    avaliacao: 5,
    disponivel: true
  },
  {
    nome: "Dra. Luísa Cossa",
    especialidade: "Direito Civil",
    provincia: "Maputo",
    anos: 9,
    telefone: "258841000005",
    email: "luisa.cossa@email.com",
    descricao: "Especialista em contratos, direito imobiliário, arrendamento e sucessões.",
    linguas: ["Português", "Inglês", "Macua"],
    avaliacao: 4,
    disponivel: true
  }
];

let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes') || '{}');

function getIniciais(nome) {
  return nome.split(' ').map(n => n[0]).slice(0, 2).join('');
}

function renderEstrelas(id, avaliacao) {
  const av = avaliacoes[id] || avaliacao;
  return [1,2,3,4,5].map(i => `
    <span class="estrela" onclick="avaliar(${id}, ${i})" title="${i} estrela(s)">
      ${i <= av ? '★' : '☆'}
    </span>
  `).join('');
}

function avaliar(id, valor) {
  avaliacoes[id] = valor;
  localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
  renderGrid(document.querySelector('.filtro-btn.active')?.dataset.filtro || '');
}

function renderGrid(filtro = '') {
  const grid = document.getElementById('advogados-grid');
  const lista = filtro
    ? ADVOGADOS.filter(a => a.especialidade === filtro)
    : ADVOGADOS;

  grid.innerHTML = lista.map((a, i) => `
    <div class="advogado-card">
      <div class="advogado-topo">
        <div class="advogado-avatar">${getIniciais(a.nome)}</div>
        <div class="advogado-topo-info">
          <h3>${a.nome} <i class="fa-solid fa-circle-check verificado"></i></h3>
          <span>${a.especialidade}</span>
        </div>
      </div>
      <div class="advogado-body">
        ${a.disponivel
          ? '<div class="disponivel">Disponível agora</div>'
          : '<div class="disponivel" style="color:#94a3b8">Ocupado</div>'}
        <div class="advogado-info-row">
          <i class="fa-solid fa-location-dot"></i> ${a.provincia}
        </div>
        <div class="advogado-info-row">
          <i class="fa-solid fa-briefcase"></i> ${a.anos} anos de experiência
        </div>
        <div class="advogado-descricao">${a.descricao}</div>
        <div class="advogado-linguas">
          ${a.linguas.map(l => `<span class="lingua-tag">${l}</span>`).join('')}
        </div>
        <div class="estrelas">${renderEstrelas(i, a.avaliacao)}</div>
        <div class="advogado-acoes">
          <a class="btn-whatsapp"
            href="https://wa.me/${a.telefone}?text=Olá%20${encodeURIComponent(a.nome)}%2C%20vim%20através%20da%20Plataforma%20de%20Normas%20Legais%20e%20gostaria%20de%20marcar%20uma%20consulta."
            target="_blank">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp
          </a>
          <a class="btn-email" href="mailto:${a.email}" title="Enviar email">
            <i class="fa-solid fa-envelope"></i>
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

function filtrar(especialidade, btn) {
  document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  btn.dataset.filtro = especialidade;
  renderGrid(especialidade);
}

function logout() {
  localStorage.removeItem('adminLogado');
  localStorage.removeItem('userType');
  window.location.href = 'login.html';
}

window.addEventListener('load', function() {
  const userType = localStorage.getItem('userType');
  const btn = document.getElementById('logoutBtn');
  if (userType && btn) btn.style.display = 'block';
  renderGrid();
});