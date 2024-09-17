const handRanks = [
    'High Card',
    'One Pair',
    'Two Pair',
    'Three of a Kind',
    'Straight',
    'Flush',
    'Full House',
    'Four of a Kind',
    'Straight Flush',
    'Royal Flush'
];

// Function to evaluate the best hand
function evaluateHand(cards) {
    const suits = {};
    const values = {};

    cards.forEach(card => {
        values[card.rank] = (values[card.rank] || 0) + 1;
        suits[card.suit] = (suits[card.suit] || 0) + 1;
    });

    const isFlush = Object.values(suits).some(count => count >= 5);
    const isStraight = checkStraight(Object.keys(values).map(Number));
    const valueCounts = Object.values(values).sort((a, b) => b - a);

    if (isFlush && isStraight) {
        return checkRoyalFlush(cards) ? 9 : 8;
    } else if (valueCounts[0] === 4) {
        return 7;
    } else if (valueCounts[0] === 3 && valueCounts[1] === 2) {
        return 6;
    } else if (isFlush) {
        return 5;
    } else if (isStraight) {
        return 4;
    } else if (valueCounts[0] === 3) {
        return 3;
    } else if (valueCounts[0] === 2 && valueCounts[1] === 2) {
        return 2;
    } else if (valueCounts[0] === 2) {
        return 1;
    }

    return 0;
}

function checkStraight(values) {
    values = values.sort((a, b) => a - b);
    for (let i = 0; i < values.length - 4; i++) {
        if (values[i + 4] - values[i] === 4) {
            return true;
        }
    }
    return false;
}

function checkRoyalFlush(cards) {
    const royalCards = ['10', 'J', 'Q', 'K', 'A'];
    const suits = cards.map(card => card.suit);
    const values = cards.map(card => card.rank);

    return royalCards.every(value => values.includes(value)) && suits.every(suit => suit === suits[0]);
}

// Function to compare hands and determine winner
function determineWinner(player1Hand, player2Hand, communityCards) {
    // Check if both hands are arrays and iterable
    if (!Array.isArray(player1Hand) || !Array.isArray(player2Hand)) {
        console.error("Hands are not properly defined or iterable");
        return;
    }

    const combinedPlayer1 = [...player1Hand, ...communityCards];
    const combinedPlayer2 = [...player2Hand, ...communityCards];

    const player1Rank = evaluateHand(combinedPlayer1);
    const player2Rank = evaluateHand(combinedPlayer2);

    const player1BestHand = getBestHand(combinedPlayer1);
    const player2BestHand = getBestHand(combinedPlayer2);

    if (player1Rank > player2Rank) {
        document.getElementById('winner').innerHTML =
            `Player 1 Wins with a ${handRanks[player1Rank]}! Best Hand: ${player1BestHand}`;
    } else if (player2Rank > player1Rank) {
        document.getElementById('winner').innerHTML =
            `CPU Wins with a ${handRanks[player2Rank]}! Best Hand: ${player2BestHand}`;
    } else {
        document.getElementById('winner').innerHTML = 'It\'s a Tie!';
    }
}

function getBestHand(cards) {
    // This is a simplified version of selecting the best five cards from the hand.
    // You would want to enhance this logic based on evaluating actual poker hands (e.g., flushes, straights).

    const sortedCards = cards.sort((a, b) => cardValue(b.rank) - cardValue(a.rank));  // Sort by card rank
    const bestFiveCards = sortedCards.slice(0, 5);  // Take the best five cards based on rank

    return bestFiveCards.map(card => `${card.rank}${card.suit[0].toUpperCase()}`).join(' ');  // Return a string of the best hand
}

function cardValue(rank) {
    if (rank === 'A') return 14;
    if (rank === 'K') return 13;
    if (rank === 'Q') return 12;
    if (rank === 'J') return 11;
    return parseInt(rank);  // For number cards
}

