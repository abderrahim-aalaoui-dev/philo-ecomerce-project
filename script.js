document.addEventListener("DOMContentLoaded", () => {
    updateAuthButton();
});

function updateAuthButton() {
    const authBtn = document.getElementById("authNavBtn");
    if (!authBtn) return;

    const isAuth = localStorage.getItem("philo_auth");
    if (isAuth === "true") {
        authBtn.innerText = "Déconnexion";
        authBtn.style.background = "#fee2e2";
        authBtn.style.color = "#ef4444";
        authBtn.style.borderColor = "#fca5a5";
        authBtn.onclick = (e) => {
            e.preventDefault();
            localStorage.removeItem("philo_auth");
            window.location.href = "index.html";
        };
    } else {
        authBtn.innerText = "Connexion";
        authBtn.onclick = (e) => {
            e.preventDefault();
            window.location.href = "login.html";
        };
    }
}

function checkOrderAccess() {
    const isAuth = localStorage.getItem("philo_auth");
    if (isAuth === "true") {
        window.location.href = "checkout.html";
    } else {
        window.location.href = "login.html";
    }
}

function handleLogin(event) {
    event.preventDefault();
    localStorage.setItem("philo_auth", "true");
    window.location.href = "checkout.html";
}

function handleCheckout(event) {
    event.preventDefault();
    window.location.href = "success.html";
}