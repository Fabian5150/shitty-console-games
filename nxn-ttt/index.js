// eslint-disable-next-line no-undef
const process = require('process');
// eslint-disable-next-line no-undef
const readline = require('node:readline');
// eslint-disable-next-line no-undef
const console = require('console');

class Game {
    constructor(size) {
        this.size = size;
        //2D array with the inner arrays being interpreted as rows
        this.board = new Array(size).fill(null).map(() => new Array(size).fill('_'));

        //array to store the "score" of every row [0 - size-1], column [size - 2*size-1] and diagonal (last 2 elements)
        this.scores = new Array(2 * size + 2).fill(0);
    }

    printBoard() {
        let s = " ";
        for (let i = 0; i < this.size; i++) {
            s += "    " + i;
        }
        console.log(s);
        this.board.forEach((row, index) => {
            console.log(index, row);
        });
    }

    #gameWon(i) {
        return Math.abs(this.scores[i]) === this.size;
    }

    /**
     * 
     * @param {*} i row index
     * @param {*} j column index
     */
    addEntry(i, j, player) {
        const { size, board, scores } = this;
        /* add to board */
        board[i][j] = player === "p1" ? "x" : "o";

        /* add score to the row */
        scores[i] += (player === "p1" ? 1 : -1);
        if (this.#gameWon(i)) return player;

        /* add score to the column */
        scores[size + j] += (player === "p1" ? 1 : -1);
        if (this.#gameWon(size + j)) return player;

        /* add score to the diagonal */
        // check for first diagonal
        if (i === j) {
            scores[scores.length - 2] += (player === "p1" ? 1 : -1);
            if (this.#gameWon(scores.length - 2)) return player;
        }

        // check for second diagonal
        if (Math.abs(size - 1) - i === j) {
            scores[scores.length - 1] += (player === "p1" ? 1 : -1);
            if (this.#gameWon(scores.length - 1)) return player;
        }
    }
}

let game = new Game(Number(process.argv[2] ?? 3));

game.printBoard();
console.log(game.scores);

console.log("---------------------------------------");
game.addEntry(2, 0, "p1");
game.printBoard();
console.log(game.scores);
console.log("---------------------------------------");

console.log("---------------------------------------");
game.addEntry(1, 1, "p2");
game.printBoard();
console.log(game.scores);
console.log("---------------------------------------");

console.log("---------------------------------------");
game.addEntry(2, 2, "p1");
game.printBoard();
console.log(game.scores);
console.log("---------------------------------------");

console.log("---------------------------------------");
console.log(game.addEntry(0, 0, "p2"));
game.printBoard();
console.log(game.scores);
console.log("---------------------------------------");

/* const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question(`What's your name?`, (i, j) => {
    console.log(`Hi ${i, j}!`,);
    rl.close();
}); */