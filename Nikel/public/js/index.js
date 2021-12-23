const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();
//Logar no Sistema
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const senha = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Opps! Verifique o usuário ou a senha.");
        return;
    }else{
        if(account.senha !== senha){
            alert("Opps! Verifique o usuário ou a senha.");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html"
    }
})

//Criar Conta
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const senha = document.getElementById("password-create-input").value;

    if(email.length < 5) {
        alert("Preencha o campo com um e-mail válido.");
        return;
    }

    if(senha.length < 4) {
        alert("Preencha a senha com no mínimo 4 dígitos.");
        return;
    }

    saveAccaount({
        login: email,
        senha: senha,
        transactions: []
    });

    myModal.hide();

    alert("Conta criada com sucesso.");

});

function saveAccaount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function checkLogged(){
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }else{
        sessionStorage.setItem("logged", data);
    }
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }else{
        return "";
    }
}