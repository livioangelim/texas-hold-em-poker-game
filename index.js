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

// Deal two cards to each player and display them
function dealCards() {
  // Generate and shuffle a new deck for each game
  generateDeck();
  shuffleDeck();

  // Deal cards to players
  const player1Hand = [deck.pop(), deck.pop()];
  const player2Hand = [deck.pop(), deck.pop()];

  // Deal community cards (Flop, Turn, River)
  const communityCards = [deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()];

  // Display player hands and community cards
  displayCards('player1-cards', player1Hand);
  displayCards('player2-cards', player2Hand);
  displayCards('community-cards', communityCards);

  // Use determineWinner from handRanking.js
  determineWinner(player1Hand, player2Hand, communityCards);
}

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

// Event listener for the "Deal Cards" button
document.getElementById('deal-cards').addEventListener('click', dealCards);

// Initialize the deck when the page loads
generateDeck();