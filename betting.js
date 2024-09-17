let cpuPlayer = new CPU(1000);  // Initialize CPU with 1000 chips
let currentBet = 50;  // The current bet for the round

// Event listeners for betting buttons
document.getElementById('raise-btn').addEventListener('click', function() {
    placeBet('raise');
});

document.getElementById('call-btn').addEventListener('click', function() {
    placeBet('call');
});

document.getElementById('fold-btn').addEventListener('click', function() {
    placeBet('fold');
});

// Function to handle Player 1's betting logic
function placeBet(action) {
    if (action === 'raise') {
        if (player1Chips >= currentBet) {
            player1Chips -= currentBet;  // Player 1 places a bet
            pot += currentBet * 2;  // Both players add to the pot
            updateChipsAndPot();
            cpuBetting();  // Trigger CPU decision after Player 1 raises
        } else {
            alert("You don't have enough chips to raise!");
        }
    } else if (action === 'call') {
        player1Chips -= currentBet;
        cpuPlayer.chips -= currentBet;
        pot += currentBet * 2;  // Add to the pot
        updateChipsAndPot();
        cpuBetting();  // Trigger CPU decision after Player 1 calls
    } else if (action === 'fold') {
        alert('Player 1 folds! CPU wins the pot.');
        cpuPlayer.chips += pot;  // CPU wins the pot
        resetRound();
    }
}

// Function to handle CPU's betting decision using the CPU class
function cpuBetting() {
    const action = cpuPlayer.makeDecision(currentBet, pot);  // CPU decides its action
    cpuPlayer.takeAction(action, currentBet, pot);  // CPU takes action and updates pot
}

// Update chip and pot displays
function updateChipsAndPot() {
    document.getElementById('player1-chips').innerText = player1Chips;
    document.getElementById('player2-chips').innerText = cpuPlayer.chips;
    document.getElementById('pot').innerText = pot;
}

// Reset the round reset the game for the next round
function resetRound() {
    pot = 0;  // Reset the pot
    document.getElementById('pot').innerText = pot;
    document.getElementById('deal-cards').innerText = 'Deal Cards';  // Reset button text
    document.getElementById('winner').innerText = '';  // Clear winner message

    generateDeck();  // Generate a new deck and shuffle for the next round
    shuffleDeck();

    disableBettingButtons();  // Disable betting buttons after the game ends
}


// Method for when CPU give up
function endGame(message) {
    alert(message);  // Display the end game message (e.g., "CPU folds! Player 1 wins the pot.")

    player1Chips += pot;  // Player 1 wins the pot when CPU folds
    pot = 0;  // Reset the pot for the next round

    updateChipsAndPot();  // Update chips and pot on UI

    // Reset the game for the next round
    resetRound();
}

// Add this function in betting.js to enable betting buttons
function enableBettingButtons() {
    document.getElementById('raise-btn').disabled = false;
    document.getElementById('call-btn').disabled = false;
    document.getElementById('fold-btn').disabled = false;
}

// Disable betting buttons after CPU folds or game ends
function disableBettingButtons() {
    document.getElementById('raise-btn').disabled = true;
    document.getElementById('call-btn').disabled = true;
    document.getElementById('fold-btn').disabled = true;
}
