class CPU {
    constructor(chips) {
        this.chips = chips;  // Initialize CPU chips
        this.hand = [];      // Store the CPU's hand here
        this.bluffChance = 0.2;  // 20% chance to bluff (can be adjusted)
    }

    // Function to evaluate CPU hand strength using existing logic
    evaluateHand() {
        return evaluateHand(this.hand);  // Assuming evaluateHand is already defined in handRanking.js
    }

    // Bluffing logic: random chance to bluff
    bluffing() {
        return Math.random() < this.bluffChance;  // Returns true if the CPU decides to bluff
    }

    // Function to make CPU betting decision based on hand strength and bluffing
    makeDecision(currentBet, pot) {
        const handStrength = this.evaluateHand();
        console.log(`CPU Hand Strength: ${handStrength}`);

        // If bluffing, CPU might raise even with a weak hand
        if (this.bluffing()) {
            console.log("CPU is bluffing!");
            return 'raise';
        }

        // Normal decision based on hand strength
        if (handStrength >= 7 && this.chips >= currentBet) {
            return 'raise';  // Strong hand, likely to raise
        } else if (handStrength >= 4 && this.chips >= currentBet) {
            return 'call';  // Medium hand, likely to call
        } else {
            return 'fold';  // Weak hand, likely to fold
        }
    }

    // Function to process CPU's action and update game state
    takeAction(action, currentBet, pot) {
        if (action === 'raise') {
            this.chips -= currentBet;  // CPU raises
            pot += currentBet * 2;
            alert('CPU raises!');
        } else if (action === 'call') {
            this.chips -= currentBet;  // CPU calls
            pot += currentBet * 2;
            alert('CPU calls!');
        } else if (action === 'fold') {
            // End the game when CPU folds
            endGame('CPU folds! Player 1 wins the pot.');
            return;  // Exit the function
        }

        updateChipsAndPot();
    }
}