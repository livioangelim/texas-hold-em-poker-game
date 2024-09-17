export class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.imgPath = `images/${suit}/${suit}${rank}.png`;  // Generate the image path in the constructor
    }

    getImage() {
        return this.imgPath;
    }
}
