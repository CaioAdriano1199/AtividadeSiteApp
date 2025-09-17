const login = document.getElementById("telalogin");
const cadastro = document.getElementById("telacadastro");
const conteudo = document.getElementById("telaconteudo");
const menuacaoL = document.getElementById("menuacao");
const olaP = document.querySelector(".container p");

function paratelacadastro() {
    login.style.display = "none";
    cadastro.style.display = "flex";
}

function paratelalogin() {
    login.style.display = "flex";
    cadastro.style.display = "none";
}

function paratelaconteudo() {
    login.style.display = "none";
    conteudo.style.display = "flex";
    
}

function abrirmenuacao() {
    menuacaoL.classList.toggle("ativo");
}

document.addEventListener("click", function (event) {
    if (!menuacaoL.contains(event.target) && !olaP.contains(event.target)) {
        menuacaoL.classList.remove("ativo");
    }
});

function mostrarRanking() {
  document.getElementById("telahome").style.display = "none";
  document.getElementById("telalugares").style.display = "none";
  document.getElementById("telaperfil").style.display = "none";
  document.getElementById("telaranking").style.display = "block";

  carregarRanking();
}

function mostrarLugares() {
  document.getElementById("telahome").style.display = "none";
  document.getElementById("telalugares").style.display = "block";
  document.getElementById("telaperfil").style.display = "none";
  document.getElementById("telaranking").style.display = "none";

}

function mostrarHome() {
  document.getElementById("telahome").style.display = "block";
  document.getElementById("telalugares").style.display = "none";
  document.getElementById("telaperfil").style.display = "none";
  document.getElementById("telaranking").style.display = "none";

}

function mostrarPerfil() {
  document.getElementById("telahome").style.display = "none";
  document.getElementById("telalugares").style.display = "none";
  document.getElementById("telaperfil").style.display = "block";
  document.getElementById("telaranking").style.display = "none";

}

function fazerLogoff() {
  localStorage.clear();
  window.location.reload();
}

function mostarnav() {
  const barra = document.getElementById("barranavegacao");
  if (!barra) return; // se não existir, não faz nada
  barra.style.visibility = 'visible';
}
