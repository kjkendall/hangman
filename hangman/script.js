// script.js

// Categories with words and hints
const categories = {
    music: [
        { word: "usher", hint: "An R&B legend known for hits like 'Yeah!'" },
        { word: "beyonce", hint: "Queen of the Beyhive" },
        { word: "drake", hint: "This rapper started from the bottom" },
        { word: "rihanna", hint: "Singer who asked 'Where have you been?'" }
    ],
    colors: [
        { word: "turquoise", hint: "A mix of blue and green" },
        { word: "magenta", hint: "A bright shade of pink" },
        { word: "lavender", hint: "A soft purple, also a flower" },
        { word: "crimson", hint: "A deep red color" }
    ],
    names: [
        { word: "jordan", hint: "A common name and a basketball legend's last name" },
        { word: "ashley", hint: "Popular name for girls in the 90s" },
        { word: "michael", hint: "One of the most common male names" },
        { word: "olivia", hint: "This name means 'olive tree'" }
    ]
};

// Variables
let selectedCategory = null;
let selectedWord = "";
let hint = "";
let correctLetters = [];
let wrongGuesses = [];
const maxGuesses = 6;

// DOM Elements
const categorySelect = document.getElementById("categorySelect");
const hintDisplay = document.getElementById("hintDisplay");
const wordDisplay = document.getElementById("wordDisplay");
const message = document.getElementById("message");
const lettersDiv = document.getElementById("letters");
const restartBtn = document.getElementById("restart-btn");
const themeToggle = document.getElementById("toggle-theme");

let isDarkMode = false;

// Function to start the game based on the selected category
function startGame(category) {
    selectedCategory = categories[category];
    const randomWordObj = selectedCategory[Math.floor(Math.random() * selectedCategory.length)];
    selectedWord = randomWordObj.word.toLowerCase();
    hint = randomWordObj.hint;
    correctLetters = Array(selectedWord.length).fill("_");
    wrongGuesses = [];
    updateWordDisplay();
    showHint();
    generateLetterButtons();
    message.textContent = ""; // Clear previous messages
}

// Function to show the hint
function showHint() {
    hintDisplay.textContent = `Hint: ${hint}`;
}

// Function to update the word display
function updateWordDisplay() {
    wordDisplay.textContent = correctLetters.join(" ");
}

// Function to generate alphabet letter buttons
function generateLetterButtons() {
    lettersDiv.innerHTML = ""; // Clear previous buttons
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    alphabet.split("").forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", () => handleGuess(letter));
        lettersDiv.appendChild(button);
    });
}

// Function to handle user guesses
function handleGuess(letter) {
    if (selectedWord.includes(letter)) {
        // Correct guess, update letters
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                correctLetters[i] = letter;
            }
        }
        updateWordDisplay();
        if (!correctLetters.includes("_")) {
            message.textContent = "You win! 🎉";
            disableLetterButtons();
        }
    } else {
        // Wrong guess, update wrong guesses
        wrongGuesses.push(letter);
        message.textContent = `Wrong guesses: ${wrongGuesses.join(", ")} (${wrongGuesses.length}/${maxGuesses})`;
        if (wrongGuesses.length >= maxGuesses) {
            message.textContent = `You lose! The word was "${selectedWord}". 😔`;
            disableLetterButtons();
        }
    }
}

// Function to disable letter buttons after the game ends
function disableLetterButtons() {
    const buttons = lettersDiv.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);
}

// Event listener for category selection
categorySelect.addEventListener("change", function() {
    const selectedOption = categorySelect.value;
    startGame(selectedOption);
});

// Event listener for restart button
restartBtn.addEventListener("click", function() {
    startGame(categorySelect.value);
});



// Function to toggle light and dark mode
themeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    isDarkMode = !isDarkMode;
    themeToggle.textContent = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
});


// Start game with default category (music) at page load
startGame('music');
