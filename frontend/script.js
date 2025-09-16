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