import { Deck } from './deck.js';        // Import the Deck class
import { enableBettingButtons, disableBettingButtons } from './betting.js';  // Import betting controls
import { GameState } from './gameState.js';  // Import GameState
import { CPU } from './cpu.js';          // Import CPU logic
import { determineWinner } from './handRanking.js';  // Import hand ranking logic

// Variables for the game state (can be moved to GameState if centralizing)
let deck;
let player1Hand = [];
let player2Hand = [];
let communityCards = [];

// Initialize the game and deal cards
function dealCards() {
  deck = new Deck();  // Create a new deck and shuffle it
  player1Hand = [deck.dealCard(), deck.dealCard()];
  player2Hand = [deck.dealCard(), deck.dealCard()];
  communityCards = [deck.dealCard(), deck.dealCard(), deck.dealCard(), deck.dealCard(), deck.dealCard()];

  // Display the hands and community cards
  displayCards('player1-cards', player1Hand);
  displayHiddenCards('player2-cards', 2);
  displayCards('community-cards', communityCards);

  enableBettingButtons();  // Enable betting after cards are dealt
}

// Display Player 2's hidden cards (back side)
function displayHiddenCards(containerId, numCards) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  for (let i = 0; i < numCards; i++) {
    const img = document.createElement('img');
    img.src = 'images/back/back-blue.png';  // Path to the back of the card
    container.appendChild(img);
  }
}

// Display the actual cards
function displayCards(containerId, cards) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  cards.forEach(card => {
    const img = document.createElement('img');
    img.src = card.getImage();  // Get the image from the Card class
    container.appendChild(img);
  });
}

// Add event listener for dealing cards
document.getElementById('deal-cards').addEventListener('click', dealCards);
