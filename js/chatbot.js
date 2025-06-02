console.log("chatbot.js chargé !");

console.log("chatbot.js chargé !");

// 1. Classe pour gérer l'historique
class ChatHistory {
  constructor() {
    this.messages = [];
  }

  addMessage(message) {
    this.messages.push(message);
  }

  getHistory() {
    return this.messages;
  }
}

const historyMessages = new ChatHistory();

// 2. Affichage des messages dans la boîte de chat
function showMessage(message, type) {
  const chatBox = document.getElementById("chat-box");

  const msg = document.createElement("p");
  msg.className = type === 'user' ? 'message-user' : 'message-bot';
  msg.textContent = `${type === 'user' ? "Vous" : "Chatbot"} : ${message}`;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Sauvegarde dans l'historique
  historyMessages.addMessage({ message, type });
}

// 3. Traitement du message utilisateur
function sendMessage(intents) {
  const input = document.getElementById("user-input");
  const userMessage = input.value.trim();
  if (userMessage === "") return;

  showMessage(userMessage, 'user');

  let matched = false;
  for (let intent of intents) {
    for (let pattern of intent.patterns) {
      if (userMessage.toLowerCase().includes(pattern.toLowerCase())) {
        const response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
        showMessage(response, 'bot');
        matched = true;
        break;
      }
    }
    if (matched) break;
  }

  if (!matched) {
    const fallback = intents.find(i => i.tag === "fallback");
    if (fallback) {
      showMessage(fallback.responses[0], 'bot');
    }
  }

  input.value = "";
}

// 4. Chargement du JSON (depuis bouton Envoyer)
function fetchJSON(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Erreur réseau');
      return response.json();
    })
    .then(data => {
      if (!data.intents || !Array.isArray(data.intents)) {
        throw new Error('JSON invalide ou vide');
      }
      sendMessage(data.intents);
    })
    .catch(error => {
      console.error("Erreur dans fetchJSON:", error);
    });
}

// 5. Sauvegarde dans sessionStorage avant de quitter
function saveMessages() {
  sessionStorage.setItem('chatHistory', JSON.stringify(historyMessages.getHistory()));
}

// 6. Chargement depuis sessionStorage
function loadMessages() {
  const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory'));
  if (chatHistory) {
    chatHistory.forEach(msg => {
      showMessage(msg.message, msg.type);
      historyMessages.addMessage(msg);
    });
  }
}

// 7. Événements du navigateur
window.addEventListener("beforeunload", saveMessages);
window.addEventListener("DOMContentLoaded", loadMessages);


function fetchJSON(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        throw new Error('Empty JSON or malformed JSON');
      }
      console.log(data);
      sendMessage(data.intents); // Cette fonction devra exister
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function sendMessage(intents) {
  const input = document.getElementById("user-input");
  const userMessage = input.value.trim();

  if (userMessage === "") return;

  // a. Récupération de la saisie => déjà fait
  // b. Affichage dans la boîte de chat
  showMessage(userMessage, 'user');

  // c. Traitement du message
  const lowerMessage = userMessage.toLowerCase();
  let matched = false;

  for (let intent of intents) {
    for (let pattern of intent.patterns) {
      if (lowerMessage.includes(pattern.toLowerCase())) {
        const response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
        // d. Affichage de la réponse
        showMessage(response, 'bot');
        matched = true;
        break;
      }
    }
    if (matched) break;
  }

  // e. Si aucune réponse trouvée, fallback
  if (!matched) {
    const fallback = intents.find(i => i.tag === "fallback");
    if (fallback) {
      showMessage(fallback.responses[0], 'bot');
    }
  }

  // f. Effacer la saisie
  input.value = "";
}

function showMessage(message, type) {
  const chatBox = document.getElementById("chat-box");

  const msg = document.createElement("p");
  msg.className = type === 'user' ? 'message-user' : 'message-bot';
  msg.textContent = `${type === 'user' ? "Vous" : "Chatbot"} : ${message}`;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Fonction pour traiter le message de l'utilisateur
function processMessage(intents, message) {
  // Par défaut, la réponse est celle du fallback
  let response = "Je suis désolé, je ne suis pas sûr de comprendre.";

  // Parcourir les intentions
  for (let intent of intents) {
    for (let pattern of intent.patterns) {
      if (message.toLowerCase().includes(pattern.toLowerCase())) {
        // Sélectionner une réponse aléatoire
        return intent.responses[Math.floor(Math.random() * intent.responses.length)];
      }
    }
  }

  // Si aucune correspondance trouvée, retourner la réponse par défaut
  return response;
}
