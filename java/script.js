// script.js

// Effets visuels simples sur les annonces du fichier explorer.html
const annonces = document.querySelectorAll(".annonce");

annonces.forEach(annonce => {
    annonce.addEventListener("mouseenter", () => {
        annonce.style.transform = "scale(1.03)";
        annonce.style.transition = "0.3s ease-in-out";
        annonce.style.boxShadow = "0px 4px 15px rgba(0, 255, 191, 0.4)";
    });

    annonce.addEventListener("mouseleave", () => {
        annonce.style.transform = "scale(1)";
        annonce.style.boxShadow = "none";
    });
});



document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.btn-explorer').forEach(bouton => {
        bouton.addEventListener('click', function (e) {
            e.preventDefault();
            simulateHack();
        });
    });
});

function simulateHack() {
    alert("⚠️ Connexion non sécurisée détectée...");

    setTimeout(function () {
        alert("💀 Accès au Dark Web intercepté...");
    }, 500);

    setTimeout(function () {
        alert("🔓 Données personnelles en cours d'extraction...");
    }, 1000);

    setTimeout(function () {
        alert("📡 Adresse IP localisée. Connexion instable...");
    }, 1500);

    setTimeout(function () {
        alert("🛑 Vous venez d'être simulé comme compromis !");
    }, 2000);

    setTimeout(function () {
        alert("⚠️ Votre ordinateur va exploser dans quelques secondes 😊");
    }, 2500);

    // Redirection après la. dernière alerte
    setTimeout(function () {
        window.location.href = "hacked.html";
    }, 3000); // Redirige après 3 secondes
}


//Menu hamburger

const menuHamburger = document.querySelector(".menu-hamburger")
        const navLinks = document.querySelector(".nav-links")
 
        menuHamburger.addEventListener('click',()=>{
        navLinks.classList.toggle('mobile-menu')
        })