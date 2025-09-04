const words = {
  animals: {
    easy: [
      "cat",
      "dog",
      "cow",
      "rat",
      "bat",
      "ant",
      "fox",
      "bee",
      "owl",
      "pig",
      "hen",
      "eel",
      "yak",
      "emu",
      "ram",
      "ape",
      "fly",
      "jay",
      "cod",
      "gnu",
      "pug",
      "mole",
      "newt",
      "toad",
      "crab",
      "lark",
      "swam",
      "dove",
      "mink",
      "pony",
      "seal",
    ],
    intermediate: [
      "tiger",
      "zebra",
      "camel",
      "otter",
      "koala",
      "eagle",
      "beaver",
      "donkey",
      "parrot",
      "weasel",
      "badger",
      "ferret",
      "gopher",
      "jaguar",
      "lemur",
      "meerkat",
      "mongoose",
      "panther",
      "peacock",
      "porcupine",
      "squirrel",
      "vulture",
      "walrus",
      "woodpecker",
    ],
    hard: [
      "chimpanzee",
      "hippopotamus",
      "rhinoceros",
      "alligator",
      "crocodile",
      "orangutan",
      "salamander",
      "tarantula",
      "armadillo",
      "hedgehog",
      "chameleon",
      "flamingo",
      "grasshopper",
      "woodchuck",
      "butterfly",
      "caterpillar",
      "dragonfly",
      "grasshopper",
      "ladybug",
      "praying mantis",
    ],
  },
  objects: {
    easy: [
      "pen",
      "cup",
      "book",
      "car",
      "hat",
      "key",
      "bag",
      "shoe",
      "box",
      "lamp",
      "ring",
      "desk",
      "door",
      "fish",
      "leaf",
      "ball",
      "cake",
      "coin",
      "flag",
      "fork",
      "glove",
      "kite",
      "map",
      "nest",
      "pipe",
      "rope",
      "shoe",
      "star",
      "tire",
      "vase",
    ],
    intermediate: [
      "guitar",
      "laptop",
      "bottle",
      "table",
      "spoon",
      "pillow",
      "camera",
      "wallet",
      "bicycle",
      "jacket",
      "mirror",
      "notebook",
      "pencil",
      "saddle",
      "suitcase",
      "telescope",
      "umbrella",
      "vacuum",
      "whistle",
      "yogurt",
    ],
    hard: [
      "microscope",
      "refrigerator",
      "binoculars",
      "encyclopedia",
      "headphones",
      "thermometer",
      "typewriter",
      "ventilator",
      "waterfall",
      "xylophone",
      "zeppelin",
      "abacus",
      "backpack",
      "calculator",
      "dishwasher",
      "fireplace",
      "greenhouse",
      "hairdryer",
      "jewelry",
      "lighthouse",
      "motorcycle",
    ],
  },
  places: {
    easy: [
      "rome",
      "paris",
      "cuba",
      "lima",
      "oslo",
      "seoul",
      "peru",
      "chile",
      "india",
      "egypt",
      "greece",
      "spain",
      "italy",
      "china",
      "brazil",
      "canada",
      "france",
      "gabon",
      "ghana",
      "kenya",
      "libya",
      "malta",
      "nepal",
      "qatar",
      "sudan",
      "tonga",
      "yemen",
    ],
    intermediate: [
      "belize",
      "london",
      "tokyo",
      "mexico",
      "germany",
      "finland",
      "iceland",
      "ireland",
      "portugal",
      "sweden",
      "thailand",
      "vietnam",
      "argentina",
      "australia",
      "colombia",
      "croatia",
      "ecuador",
      "hungary",
      "jamaica",
      "malaysia",
      "mongolia",
      "nigeria",
      "romania",
      "slovakia",
      "taiwan",
      "uruguay",
    ],
    hard: [
      "madagascar",
      "kazakhstan",
      "philippines",
      "azerbaijan",
      "bangladesh",
      "czechoslovakia",
      "dominican republic",
      "el salvador",
      "guatemala",
      "liechtenstein",
      "luxembourg",
      "mauritius",
      "new zealand",
      "pakistan",
      "switzerland",
      "turkmenistan",
      "uzbekistan",
      "venezuela",
      "yugoslavia",
    ],
  },
};

let score = 0;
let level = 1;
let currentWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrong = 6; // 6 body parts
const bodyParts = document.querySelectorAll(".body img");

const soundCorrect = new Audio("sounds/correct.mp3");
const soundWrong = new Audio("sounds/wrong.mp3");
const soundWin = new Audio("sounds/victory.mp3");
const soundLose = new Audio("sounds/lose.mp3");

// DOM elements
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const hintEl = document.getElementById("hint");
const blankEl = document.querySelector(".blank");
const letterButtons = document.querySelectorAll(".letters button");

levelEl.textContent = `level: ${level}`;
scoreEl.textContent = `score: ${score}`;

// Decide difficulty based on level
function getDifficulty(level) {
  if (level <= 5) return "easy";
  else if (level <= 10) return "intermediate";
  else return "hard";
}

// Pick a random word
function getRandomWord() {
  const categories = Object.keys(words);
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];
  hintEl.textContent = `hint: ${randomCategory}`;
  console.log("Category:", randomCategory);
  const difficulty = getDifficulty(level);

  const wordList = words[randomCategory][difficulty];
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

  return { category: randomCategory, difficulty, word: randomWord };
}

// Update score & level
function updateScore(points) {
  score += points;
  level = level + 1;
  scoreEl.textContent = `score: ${score}`;
  levelEl.textContent = `level: ${level}`;
}
function resetHangman() {
  wrongGuesses = 0;
  bodyParts.forEach((part) => (part.style.display = "none"));
}

// Show next body part on wrong guess
function showNextBodyPart() {
  if (wrongGuesses < bodyParts.length) {
    switch (wrongGuesses) {
      case 0:
        bodyParts[0].style.display = "block"; // head
        break;
      case 1:
        bodyParts[5].style.display = "block"; // body
        break;
      case 2:
        bodyParts[1].style.display = "block";
        break; // right arm
      case 3:
        bodyParts[2].style.display = "block";
        break; // left arm
      case 4:
        bodyParts[3].style.display = "block";
        break; // right leg
      case 5:
        bodyParts[4].style.display = "block";
        break; // left leg
    }
    wrongGuesses++;
  }

  // If player used all guesses → Game Over
  if (wrongGuesses === maxWrong) {
    setTimeout(() => {
      alert(`Game Over! The word was: ${currentWord}`);
      newRound();
    }, 500);
  }
}

// Render the word blanks with guessed letters
function renderWord() {
  const display = currentWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
  blankEl.textContent = display;

  // Check win condition
  if (!display.includes("_")) {
    updateScore(10);
    setTimeout(() => {
      newRound();
    }, 1000);
  }
}

// Handle letter guess
function handleGuess(letter) {
  if (guessedLetters.includes(letter)) return; // already guessed
  guessedLetters.push(letter);
  const button = Array.from(letterButtons).find(
    (btn) => btn.textContent.toLowerCase() === letter
  );

  if (currentWord.includes(letter)) {
    renderWord();
    if (button) button.classList.add("button-correct");
    soundCorrect.play();
  } else {
    // TODO: wrong guess → show next hangman part
    console.log("Wrong guess:", letter);
    soundWrong.play();
    showNextBodyPart();
  }
}

// Start a new round
function newRound() {
  const { category, word } = getRandomWord();
  currentWord = word;
  guessedLetters = [];
  hintEl.textContent = `hint: ${category}`;
  renderWord();
  resetHangman();

  // Reset buttons
  letterButtons.forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove("button-correct");
  });
}

// Add event listeners to letter buttons
letterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const letter = button.textContent.toLowerCase();
    button.disabled = true; // disable after click
    handleGuess(letter);
  });
});

document.addEventListener("keydown", (e) => {
  let letter = e.key.toLowerCase();

  // Only allow A–Z
  if (letter.match(/^[a-z]$/)) {
    // Disable button if exists
    letterButtons.forEach((btn) => {
      if (btn.textContent.toLowerCase() === letter) {
        btn.disabled = true;
      }
    });

    handleGuess(letter);
  }
});

// Start game
newRound();
