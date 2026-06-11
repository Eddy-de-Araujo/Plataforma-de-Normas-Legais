document.addEventListener("DOMContentLoaded", function () {

    const card = document.querySelector(".card");
    const signin = document.querySelector(".signin");
    const signup = document.querySelector(".signup");


    window.toggleView = function () {
        card.classList.toggle("active");
        signin.classList.toggle("active");
        signup.classList.toggle("active");
    };

    window.registar = function () {

        const nome = document.getElementById("regNome").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const senha = document.getElementById("regSenha").value.trim();

        if (nome === "" || email === "" || senha === "") {
            alert("Preencha todos os campos");
            return;
        }

        localStorage.setItem("userNome", nome);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userSenha", senha);

        alert("Conta criada com sucesso!");

        document.getElementById("regNome").value = "";
        document.getElementById("regEmail").value = "";
        document.getElementById("regSenha").value = "";

        card.classList.remove("active");
        signup.classList.remove("active");
        signin.classList.add("active");
    };
     

  window.login = function () {

    const email = document.getElementById("loginEmail").value.trim();
    const senha = document.getElementById("loginSenha").value.trim();

    const emailGuardado = localStorage.getItem("userEmail");
    const senhaGuardada = localStorage.getItem("userSenha");

    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_SENHA = "1234";

    const isAdmin = (email === ADMIN_EMAIL && senha === ADMIN_SENHA);
    const isUser = (email === emailGuardado && senha === senhaGuardada);

    if (isAdmin || isUser) {

        alert("Login realizado com sucesso!");

        if (isAdmin) {
            localStorage.setItem("userType", "admin");
        } else {
            localStorage.setItem("userType", "user");
        }
        
        window.location.href = "index.html";

    } else {
        alert("Credenciais inválidas");
    }
};

});
