// Get references to the necessary elements from the HTML document
const startButton = document.getElementById('startButton'); // Get the 'Start' button element
const resetButton = document.getElementById('resetButton'); // Get the 'Reset' button element
const userInput = document.getElementById('userInput'); // Get the textarea element for user input
const resultDisplay = document.getElementById('result'); // Get the result display area
const quoteElement = document.getElementById('quote'); // Get the element to display the quote

// Define an array of quotes to be used for the typing test
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "The secret of getting ahead is getting started. - Mark Twain"
];

// Function to randomly select a quote from the array
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Initialize the quote to be displayed
let quote = getRandomQuote();
quoteElement.textContent = quote;

// Add an event listener to the 'Start' button to trigger the typing speed test
startButton.addEventListener('click', startTest);

// Add an event listener to the 'Reset' button to reset the test
resetButton.addEventListener('click', resetTest);

// Define the function that will execute when the 'Start' button is clicked
function startTest() {
    // Step 4: Record the start time of the typing test
    const startTime = new Date().getTime();

    // Get the text typed by the user
    const typedText = userInput.value;
    let correctChars = 0; // Initialize a variable to count correct characters

    // Iterate through the typed text and compare it with the quote
    for (let i = 0; i < Math.min(typedText.length, quote.length); i++) {
        if (typedText[i] === quote[i]) { // Compare each character
            correctChars++; // Increment correctChars if the character matches
        }
    }

    // Calculate accuracy, speed, and other metrics
    const accuracy = (correctChars / quote.length) * 100; // Calculate accuracy percentage
    const endTime = new Date().getTime(); // Record the end time of the typing test
    const totalTime = (endTime - startTime) / 1000; // Calculate total time taken (in seconds)
    const speed = (quote.length / totalTime) * 60; // Calculate typing speed (characters per minute)

    // Format accuracy and speed values
    const accuracyFormatted = accuracy.toFixed(2); // Format accuracy to two decimal places
    const speedFormatted = isNaN(speed) ? 0 : speed.toFixed(2); // Handle case when speed is NaN (e.g., no input or too fast typing)

    // Generate a message based on typing speed
    let message = ""; // Initialize an empty message
    if (speed === Infinity) {
        message = "Wow! You're typing at lightning speed!";
    } else if (speed < 10) {
        message = "Hmm... You might want to slow down a bit.";
    } else {
        message = "Great job!";
    }

    // Display the accuracy, speed, and message in the result display area
    resultDisplay.innerHTML = `
        <p>Accuracy: ${accuracyFormatted}% (You got ${correctChars} out of ${quote.length} characters correct)</p>
        <p>Speed: ${speedFormatted} characters per minute</p>
        <p>${message}</p>
    `;

    // Show the result display area and enable the 'Reset' button
    resultDisplay.classList.remove('hidden');
    resetButton.disabled = false;

    // Disable the 'Start' button and textarea
    startButton.disabled = true;
    userInput.disabled = true;
}

// Function to reset the test
function resetTest() {
    // Clear the user input and result display area
    userInput.value = '';
    resultDisplay.innerHTML = '';
    resultDisplay.classList.add('hidden');

    // Select a new random quote
    quote = getRandomQuote();
    quoteElement.textContent = quote;

    // Enable the 'Start' button and textarea
    startButton.disabled = false;
    userInput.disabled = false;

    // Disable the 'Reset' button
    resetButton.disabled = true;
}