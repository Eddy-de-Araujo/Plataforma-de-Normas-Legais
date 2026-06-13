
// LOGIN ADMIN
function login() {

    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;

    if (email === "admin@normas.com" && senha === "123456") {

        localStorage.setItem("adminLogado", "true");
        localStorage.setItem("userType", "admin");

        window.location.href = "index.html";

    } else {

        alert("Email ou senha incorrectos");

    }
}


// MOSTRAR BOTÃO ADMIN
window.addEventListener("load", function () {

    const userType = localStorage.getItem("userType");
    const btn = document.getElementById("adminBtn");

    if (userType === "admin" && btn) {
        btn.style.display = "block";
    }

    // Página inicial activa
    showPage("home");

});


// NAVEGAÇÃO ENTRE PÁGINAS
function showPage(page) {

    // ESCONDER TODAS AS PÁGINAS
    document.querySelectorAll(".page")
    .forEach(p => {
        p.classList.remove("active");
    });

    // MOSTRAR PÁGINA SELECCIONADA
    const selectedPage = document.getElementById("page-" + page);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    // ACTIVAR BOTÃO DA NAVBAR
    document.querySelectorAll(".nav-links button")
    .forEach(button => {

        button.classList.remove("active");

        if (button.dataset.page === page) {
            button.classList.add("active");
        }

    });

    // ACTUALIZAR CONTEÚDO
    if (page === "normas") {
        renderList();
    }

    if (page === "admin") {
        renderAdminUpdates();
    }

    // VOLTAR AO TOPO
    window.scrollTo(0, 0);
}




// BASE DE DADOS

const NORMAS = [

  {
    id: 1,
    titulo: "Convenção de Budapeste",
    tipo: "Convenção",
    numero: "2021",
    data: "2021",
    categoria: "Cibercrime",
    resumo: "Convenção sobre o cibercrime.",

    pdf: "Legislacao/CONVENSAO DE BUDAPESTE.pdf"
  },

  {
    id: 2,
    titulo: "Constituição da República de Moçambique",
    tipo: "Constituição",
    numero: "2004",
    data: "2004",
    categoria: "Constitucional",
    resumo: "Lei fundamental do Estado.",

    pdf: "Legislacao/Constituicao_republica_mocambique.pdf"
  },

  {
    id: 3,
    titulo: "Lei de Transacções Electrónicas",
    tipo: "Lei",
    numero: "3/2017",
    data: "2017",
    categoria: "Tecnologia",
    resumo: "Regula transacções electrónicas.",

    pdf: "Legislacao/LEI_DE_TRANSACCOES_ELECTRONICAS.pdf"
  },

  {
    id: 4,
    titulo: "Código Penal",
    tipo: "Lei",
    numero: "24/2019",
    data: "2019",
    categoria: "Penal",
    resumo: "Revisão do Código Penal.",

    pdf: "Legislacao/lei-24-2019-lei-de-revisao-do-codigo-penal.pdf"
  },

  {
    id: 5,
    titulo: "Código do Processo Penal",
    tipo: "Lei",
    numero: "25/2019",
    data: "2019",
    categoria: "Processual",
    resumo: "Revisão do Código do Processo Penal.",

    pdf: "Legislacao/codigo-processo-penal.pdf"
  },

  {
    id: 6,
    titulo: "Lei dos Direitos de Autor",
    tipo: "Lei",
    numero: "4/2001",
    data: "2021",
    categoria: "Direitos Autorais",
    resumo: "Protecção dos direitos de autor.",

    pdf: "Legislacao/Lei-dos-Direitos-de-Autor-e-Direitos-Conexos.pdf"
  },

  {
    id: 7,
    titulo: "Regulamento Académico UP",
    tipo: "Regulamento",
    numero: "244",
    data: "2022",
    categoria: "Educação",
    resumo: "Normas académicas institucionais.",

    pdf: "Legislacao/NOVO_REGULAMENTO_ACADEMICO_DA_UP-MAPUTO-NO_BR.pdf"
  },

  {
    id: 8,
    titulo: "Regulamento Académico UEM",
    tipo: "Regulamento",
    numero: "244",
    data: "2025",
    categoria: "Educação",
    resumo: "Normas académicas institucionais.",

    pdf: "UEM-Reg-Pedagogico-Agost2020.pdf"
  },

  {
    id: 9,
    titulo: "Nova Lei do Trabalho",
    tipo: "Lei",
    numero: "13",
    data: "25/08/2023",
    categoria: "Trabalho",
    resumo: "Regulamento do Trabalho.",


    pdf: "Lei-No-13-2023-de-25-de-Agosto-NOVA-LEI-DO-TRABALHO.pdf"
  },

  {
    id: 9,
    titulo: "Antiga Lei do Trabalho",
    tipo: "Lei",
    numero: "23/2007",
    data: "01/08/2007",
    categoria: "Trabalho",
    resumo: "Regulamento do Trabalho.",


    pdf: "Lei-No-13-2023-de-25-de-Agosto-NOVA-LEI-DO-TRABALHO.pdf"
  }

];

let currentNorma = null;


// NAVEGAÇÃO ENTRE PÁGINAS
function showPage(page) {

  document.querySelectorAll(".page")
    .forEach(p => p.classList.remove("active"));

  const el = document.getElementById("page-" + page);
  if (el) el.classList.add("active");

  document.querySelectorAll(".nav-links button")
    .forEach(b => {
      b.classList.toggle("active", b.dataset.page === page);
    });

  window.scrollTo(0, 0);

  if (page === "normas") renderList();
  if (page === "admin") renderAdminUpdates();
}


// HOME
function renderHomeNormas() {

  const box = document.getElementById("home-normas-list");
  if (!box) return;

  box.innerHTML = NORMAS.slice(0, 4).map(n => `
    <button class="norma-row" onclick="openNorma(${n.id})">
      <span class="badge">${n.tipo}</span>
      <div>
        <p class="norma-title">${n.titulo}</p>
        <p class="norma-date">${n.data}</p>
      </div>
    </button>
  `).join("");
}


// FILTROS
function getFilters() {
  return {
    cat: document.querySelector('input[name="cat"]:checked')?.value || "",
    tipo: document.querySelector('input[name="tipo"]:checked')?.value || "",
    q: (document.getElementById("list-search")?.value || "").toLowerCase()
  };
}

function applyFilters() {
  renderList();
}

function clearFilters() {
  document.querySelector('input[name="cat"][value=""]').checked = true;
  document.querySelector('input[name="tipo"][value=""]').checked = true;
  document.getElementById("list-search").value = "";
  renderList();
}



// LISTAGEM
function renderList() {

  const { cat, tipo, q } = getFilters();

  const filtered = NORMAS.filter(n =>
    (!cat || n.categoria === cat) &&
    (!tipo || n.tipo === tipo) &&
    (!q || n.titulo.toLowerCase().includes(q) || n.numero.includes(q))
  );

  const list = document.getElementById("norma-list");
   if (!list) return;

  document.getElementById("list-count").textContent =
    `${filtered.length} resultado(s)`;

  if (!filtered.length) {
    list.innerHTML = `<div class="empty-state">Nenhuma norma encontrada.</div>`;
    return;
  }

  list.innerHTML = filtered.map(n => `
    <div class="norma-list-item">
      <div style="flex:1">
        <div class="norma-meta">
          <span class="badge">${n.tipo}</span>
          <span class="norma-code">nº ${n.numero}</span>
          <span style="font-size:11px;color:var(--muted)">${n.data}</span>
        </div>
        <p class="norma-list-title">${n.titulo}</p>
        <p class="norma-resumo">${n.resumo}</p>
      </div>
      <button class="btn-ver" onclick="openNorma(${n.id})">Ver</button>
    </div>
  `).join("");
}




// DETALHE
function openNorma(id) {

  const currentNorma = NORMAS.find(n => n.id === id);

  if (!currentNorma) return;

  window.open(currentNorma.pdf, "_blank");
}


// TABS
function switchTab(tab, btn) {

  document.querySelectorAll(".tab-panel")
    .forEach(t => t.classList.remove("active"));

  document.querySelectorAll(".tab-btn")
    .forEach(b => b.classList.remove("active"));

  document.getElementById("tab-" + tab).classList.add("active");

  if (btn) btn.classList.add("active");
}


// ADMIN 
function switchAdmin(section, btn) {

  document.querySelectorAll(".admin-menu-btn")
    .forEach(b => b.classList.remove("active"));

  btn.classList.add("active");

  const titles = {
    dashboard: "Estatísticas do Sistema",
    adicionar: "Adicionar Norma",
    atualizar: "Atualizar Norma",
    remover: "Remover Norma",
    categorias: "Categorias",
    utilizadores: "Utilizadores",
    notificacoes: "Notificações"
  };

  document.getElementById("admin-section-title").textContent =
    titles[section] || section;

  const dashboard = document.getElementById("admin-dashboard");
  const placeholder = document.getElementById("admin-placeholder");

  if (!dashboard || !placeholder) return;
  dashboard.style.display = "block";

  if (section === "dashboard") {
    placeholder.style.display = "none";
  } else {
    placeholder.style.display = "block";
    placeholder.innerHTML = `
      <div class="placeholder-section">
        
      </div>
    `;
  }
}



// ADMIN UPDATES
function renderAdminUpdates() {

  const box = document.getElementById("admin-updates-list");
  if (!box) return;

  box.innerHTML = NORMAS.map(n => `
    <div class="update-row">
      <span class="badge">${n.tipo}</span>
      <span class="update-name">${n.titulo}</span>
      <span class="update-date">${n.data}</span>
    </div>
  `).join("");
}

window.addEventListener("load", function () {

    const userType = localStorage.getItem("userType");
    const btn = document.getElementById("adminBtn");

    if (userType === "admin" && btn) {
        btn.style.display = "block";
    }

});




// SEARCH HOME
function heroSearch() {

  const q = document.getElementById("hero-search").value;

  showPage("normas");

  setTimeout(() => {
    document.getElementById("list-search").value = q;
    renderList();
  }, 0);
}

function logout() {

    localStorage.removeItem("adminLogado");
    localStorage.removeItem("userType");

    window.location.href = "login.html";
}

function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}

function closeMenu() {
  const nav = document.getElementById('nav-links');
  if (nav) nav.classList.remove('open');
}


// INICIALIZAÇÃO
window.addEventListener("load", function () {
  if (document.getElementById("home-normas-list")) renderHomeNormas();
  if (document.getElementById("norma-list")) renderList();
  if (document.getElementById("admin-updates-list")) renderAdminUpdates();
});