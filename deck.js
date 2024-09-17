import { Card } from './card.js';

export class Deck {
    constructor() {
        this.cards = [];
        this.suits = ['clubs', 'diamonds', 'hearts', 'spades'];
        this.ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
        this.generateDeck();
        this.shuffleDeck();
    }

    generateDeck() {
        this.cards = [];
        for (let suit of this.suits) {
            for (let rank of this.ranks) {
                this.cards.push(new Card(suit, rank));
            }
        }
    }

    shuffleDeck() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    dealCard() {
        return this.cards.pop();  // Deals one card from the deck
    }
}
