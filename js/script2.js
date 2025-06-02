let attempt = 1;
function quizAlert(){
    alert("Vous êtes sur le point de commencer le quiz !");
    quizConfirm();
}
function quizConfirm() {
    // Récupération des champs
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const startButton = document.getElementById("startButton");

    // Vérification que les champs sont remplis
    if (username.value.trim() === "" || password.value.trim() === "") {
        alert("Veuillez remplir tous les champs !");
        return;
    }
    var res = confirm("Etes-vous sûr de vouloir continuer ?");
    if (res ===  true) {
    alert("Le quiz va commencer dans 5 secondes !");
    //ajouter un décompte de 5 secondes
    var timer = 5;
    //Créer un élément p pour afficher le message
    var confirmation = document.createElement("p");
    confirmation.textContent = timer + " secondes";
    //style du message
    confirmation.style.color = "red";
    confirmation.style.fontSize = "1.5em";
    confirmation.style.fontWeight = "bold";
    confirmation.style.textAlign = "center";
    //ajouter le message à la page à la suite du bouton d'id start
    var start = document.getElementById("Informations");
    start.appendChild(confirmation);
    //en utilisant la fonction setInterval qui s'exécute toutes les secondes
    var interval = setInterval(function () {
    //décrémenter le décompte
    timer--;
    //On l’affiche également dans la console
    console.log(timer);
    //afficher le décompte dans l’élément p créé
    confirmation.textContent = timer + " secondes";
    //si le décompte est terminé
    //afficher le message "C'est parti ! Bonne chance !"
    //afficher le formulaire
    //afficher le bouton de soumission
    if (timer === 0) {
        clearInterval(interval);
        confirmation.textContent = "C'est parti ! Bonne chance !";
        // Affiche la section quiz
        var formSection = document.getElementsByClassName("formulaire-section")[0];
        if (formSection) {
            formSection.style.display = "block";
        }
        // Désactiver la saisie dans le fieldset (login)
        username.disabled = true;
        password.disabled = true;
        }
        // Cacher le bouton de démarrage
        if (startButton) {
            startButton.style.display = "none";
        }

    }, 1000);
} else {
    alert("Vous allez être redirigé vers la page d'accueil !");
    window.location.href = "accueil.html";
}
}

function submitQuiz(){
    alert(`Visualisez le résultat de l'essai ${attempt}`);

    console.log("submitQuiz() appelée !");

    var score = 0;
    const correctAnswers = {
        q1: ['A', 'C', 'D'],
        q2: ['A', 'B'],
        q3: ['A', 'C'],
        q4: ['A', 'C', 'D'],
        q5: ['A', 'B', 'D'],
        q6: 'tor',
        q7: 'silk road',
        q8: 'violence',
        q9: 'monero',
        q10: 'escrow'
    };

      // Fonction de vérification des checkboxes (exact match requis)
      function checkCheckboxAnswers(questionName, correctValues){
        const selected = Array.from(document.querySelectorAll(`input[name="${questionName}"]:checked`)).map(el => el.value);
        const allCorrect = correctValues.every(val => selected.includes(val));
        const allSelectedAreCorrect = selected.every(val => correctValues.includes(val));
        return allCorrect && allSelectedAreCorrect;
      }

      // Q1 à Q5 (checkbox)
    for (let i = 1; i <= 5; i++) {
        if (checkCheckboxAnswers(`q${i}`, correctAnswers[`q${i}`])) {
            score += 2;
        }
    }

    // Q6 à Q10 (text inputs, réponses en minuscules et sans accents)
    for (let i = 6; i <= 10; i++) {
        const userInput = document.querySelector(`input[name="q${i}"]`).value.trim().toLowerCase();
        const expected = correctAnswers[`q${i}`].toLowerCase();
        if (userInput === expected) {
            score += 2;
        }
    }
    const tbody = document.querySelector("#result tbody");
    const row = document.createElement("tr");
    row.innerHTML = `<td>${attempt}</td><td>${score}/20</td>`;
    tbody.appendChild(row);

    //Message selon le score
    if (score >= 16){
        alert(`🎉 Félicitations ! Vous avez obtenu ${score}/20 !`);
    } else if (score >= 10) {
        alert(`👍 Bien joué ! Vous avez obtenu ${score}/20.`);
    } else {
        alert(`💡 Vous avez obtenu ${score}/20. Essayez encore pour vous améliorer !`);
    }
    
    attempt++;

    
}