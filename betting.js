import { GameState } from './gameState.js';
import { CPU } from './cpu.js';  // Import the CPU class for betting decisions

export let cpuPlayer = new CPU(1000);  // Initialize CPU with 1000 chips
let currentBet = 50;  // The current bet for the round

// Add event listeners for betting buttons
document.getElementById('raise-btn').addEventListener('click', function() {
    placeBet('raise');
});

document.getElementById('call-btn').addEventListener('click', function() {
    placeBet('call');
});

document.getElementById('fold-btn').addEventListener('click', function() {
    placeBet('fold');
});

// Function to end the game and reset the state
export function endGame(message) {
    alert(message);  // Display the message (e.g., "CPU folds! Player 1 wins the pot.")
    GameState.player1Chips += GameState.pot;  // Assuming Player 1 wins the pot when CPU folds
    GameState.pot = 0;  // Reset the pot for the next round
    updateChipsAndPot();  // Update chips and pot display

    // Reset the game state for the next round
    document.getElementById('deal-cards').innerText = 'Deal Cards';
    document.getElementById('winner').innerText = '';
    disableBettingButtons();  // Disable betting after the game ends
}

// Function to handle Player 1's betting logic
function placeBet(action) {
    if (action === 'raise') {
        if (GameState.player1Chips >= currentBet) {
            GameState.player1Chips -= currentBet;
            GameState.pot += currentBet * 2;
            updateChipsAndPot();
            cpuBetting();
        } else {
            alert("You don't have enough chips to raise!");
        }
    } else if (action === 'call') {
        GameState.player1Chips -= currentBet;
        cpuPlayer.chips -= currentBet;
        GameState.pot += currentBet * 2;
        updateChipsAndPot();
        cpuBetting();
    } else if (action === 'fold') {
        alert('Player 1 folds! CPU wins the pot.');
        cpuPlayer.chips += GameState.pot;
        endGame('CPU wins the pot!');
    }
}

// Function to handle CPU betting logic
function cpuBetting() {
    const action = cpuPlayer.makeDecision(currentBet, GameState.pot);
    cpuPlayer.takeAction(action, currentBet, GameState.pot);
}

// Update chip and pot displays
export function updateChipsAndPot() {
    document.getElementById('player1-chips').innerText = GameState.player1Chips;
    document.getElementById('player2-chips').innerText = cpuPlayer.chips;
    document.getElementById('pot').innerText = GameState.pot;
}

// Enable betting buttons
export function enableBettingButtons() {
    document.getElementById('raise-btn').disabled = false;
    document.getElementById('call-btn').disabled = false;
    document.getElementById('fold-btn').disabled = false;
}

// Disable betting buttons
export function disableBettingButtons() {
    document.getElementById('raise-btn').disabled = true;
    document.getElementById('call-btn').disabled = true;
    document.getElementById('fold-btn').disabled = true;
}

// Reset the round
function resetRound() {
    GameState.pot = 0;
    document.getElementById('pot').innerText = GameState.pot;
    document.getElementById('deal-cards').innerText = 'Deal Cards';  // Reset button text
    document.getElementById('winner').innerText = '';  // Clear winner message
    disableBettingButtons();  // Disable betting after round ends
}