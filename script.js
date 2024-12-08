// Questions et réponses
const questions = [
  {
      question: "Quel est le nom complet du Bouffon Vert, l'ennemi juré de Spiderman ?",
      options: [
          "Norman Osborn",
          "Harry Osborn",
          "Eddie Brock",
          "Wilson Fisk"
      ],
      answer: 0,
  },
  {
      question: "Quel super-pouvoir Spiderman obtient-il lorsqu'il est mordu par une araignée radioactive ?",
      options: [
          "Vision laser",
          "Force surhumaine",
          "Télépathie",
          "Transformation en araignée"
      ],
      answer: 1,
  },
  {
      question: "Dans quel journal Peter Parker travaille-t-il comme photographe ?",
      options: [
          "The Daily Planet",
          "The Gotham Gazette",
          "The Daily Bugle",
          "The New York Times"
      ],
      answer: 2,
  },
  {
      question: "Quelle invention de Peter Parker lui permet de tisser des toiles d’araignée ?",
      options: [
          "Un gadget fourni par Tony Stark",
          "Des capsules biologiques intégrées dans ses poignets",
          "Un lance-toiles mécanique qu’il a lui-même créé",
          "Un appareil offert par un scientifique de l’ESU"
      ],
      answer: 2,
  },
  {
      question: "Quel est le vrai nom de l'antagoniste Venom ?",
      options: [
          "Mac Gargan",
          "Eddie Brock",
          "Cletus Kasady",
          "Flash Thompson"
      ],
      answer: 1,
  },
  {
      question: "Quel membre des Avengers est souvent un mentor pour Spiderman dans les comics ?",
      options: [
          "Thor",
          "Iron Man",
          "Captain America",
          "Hawkeye"
      ],
      answer: 1,
  }
];


// Sélection des éléments DOM
const quizContainer = document.getElementById("quiz-container");
const indicesContainer = document.getElementById("indices-container");
const finalStep = document.getElementById("final-step");
const validateBtn = document.getElementById("validate-btn");
const finalAnswer = document.getElementById("final-answer");

// État du jeu
let currentQuestionIndex = 0;
let revealedCards = 0;

// Fonction pour afficher une question
function displayQuestion(index) {
  const questionObj = questions[index];
  quizContainer.innerHTML = `
      <p>${questionObj.question}</p>
      <ul>
          ${questionObj.options
            .map(
              (option, i) =>
                `<li><button class="option-btn" data-index="${i}">${option}</button></li>`
            )
            .join("")}
      </ul>
  `;

  // Ajouter les gestionnaires d'événements aux boutons d'options
  document.querySelectorAll(".option-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedOption = parseInt(e.target.dataset.index);
      if (selectedOption === questionObj.answer) {
        revealCard(index); // Appelle la fonction pour révéler l'indice
        nextQuestion();
      } else {
        alert("Mauvaise réponse ! Réessaie.");
      }
    });
  });
}

// Fonction pour révéler une carte (et son image)
function revealCard(index) {
  const card = indicesContainer.querySelector(`[data-index="${index + 1}"]`);
  const img = card.querySelector("img");
  img.classList.add("revealed");
  revealedCards++;

  // Vérifier si toutes les cartes sont retournées
  if (revealedCards === questions.length) {
    showFinalStep();
  }
}

// Fonction pour passer à la question suivante
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(currentQuestionIndex);
  } else {
    quizContainer.innerHTML = "<p>Bravo ! Tous les indices sont débloqués.</p>";
  }
}

// Fonction pour afficher l'étape finale
function showFinalStep() {
  finalStep.classList.remove("hidden");
}

// Gestionnaire pour la validation finale
validateBtn.addEventListener("click", () => {
  const answer = finalAnswer.value.trim().toLowerCase();
  if (answer === "disneyland paris") {
    // Masque le champ et affiche la photo finale
    finalStep.classList.add("hidden");
    const finalPhoto = document.getElementById("final-photo");
    finalPhoto.classList.remove("hidden");
  } else {
    alert("Ce n'est pas la bonne réponse. Réessaie !");
  }
});

// Initialisation
displayQuestion(currentQuestionIndex);
