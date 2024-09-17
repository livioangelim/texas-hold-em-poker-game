// Card details and image files
const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
let deck = [];

// Generate the deck of cards
function generateDeck() {
  deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit: suit, rank: rank, img: `${suit}/${suit} ${rank}.png` });
    }
  }
}

// Shuffle the deck using Fisher-Yates Algorithm
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

let isShowdown = false;  // Flag to track whether it's time for the showdown

function dealOrShowdown() {
  if (!isShowdown) {
    dealCards();  // Deal the cards initially
    document.getElementById('deal-cards').innerText = 'Showdown';  // Rename button to Showdown
    isShowdown = true;  // Set the flag to true, indicating next step is showdown
  } else {
    // Perform showdown, revealing Player 2's cards and determining the winner
    determineWinner(window.player1Hand, window.player2Hand, window.communityCards);
    document.getElementById('deal-cards').innerText = 'Deal Cards';  // Reset button to Deal Cards for next game
    isShowdown = false;  // Reset the flag for the next game
  }
}

function dealCards() {
  // Generate and shuffle a new deck for each game
  generateDeck();
  shuffleDeck();

  // Deal cards to players
  const player1Hand = [deck.pop(), deck.pop()];
  const player2Hand = [deck.pop(), deck.pop()];  // PC hand (hidden initially)

  // Deal community cards (Flop, Turn, River)
  const communityCards = [deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()];

  // Display Player 1's hand
  displayCards('player1-cards', player1Hand);

  // Display Player 2's hidden hand (show card backs)
  displayHiddenCards('player2-cards', 2);  // Hide Player 2's hand (PC)

  // Display the community cards
  displayCards('community-cards', communityCards);

  // Store the hands globally for later use in determineWinner
  window.player1Hand = player1Hand;
  window.player2Hand = player2Hand;
  window.communityCards = communityCards;
}

// Display card backs for Player 2 (PC)
function displayHiddenCards(containerId, numCards) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';  // Clear previous cards

  for (let i = 0; i < numCards; i++) {
    const img = document.createElement('img');
    img.src = 'images/Back/back-blue.png';  // Correct the path to the back card image
    container.appendChild(img);
  }
}


// Display CPU cards when game is over
function displayCards(containerId, cards) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';  // Clear previous cards

  cards.forEach(card => {
    console.log(card);  // Debug: Check the card object
    const img = document.createElement('img');
    if (card && card.suit && card.rank) {  // Ensure card properties are defined
      img.src = `images/${card.suit.toLowerCase()}/${card.suit.toLowerCase()}${card.rank}.png`;
      container.appendChild(img);
    } else {
      console.error("Card properties are undefined or incorrect", card);
    }
  });
}

// Event listener for the "Deal Cards" or "Showdown" button
document.getElementById('deal-cards').addEventListener('click', dealOrShowdown);

// Initialize the deck when the page loads
generateDeck();