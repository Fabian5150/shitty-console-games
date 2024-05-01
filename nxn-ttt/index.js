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

    /**
     * 
     * @param {*} i row index
     * @param {*} j column index
     */
    addEntry(i, j, player) {
        /* add to board */
        this.board[i][j] = player === "p1" ? "x" : "o";

        /* add to helper:
            +1 for player1, -1 for player2
            if any score is n, player1 won
            if any score is -n player 2 won
        */
        // add score to the row
        this.scores[i] += (player === "p1" ? 1 : -1);

        // add score to the column
        this.scores[this.size + j] += (player === "p1" ? 1 : -1);

        // add score to the diagonal
        if (i === j) {
            this.scores[this.scores.length - 2] += (player === "p1" ? 1 : -1);
        }
        if ((this.size - 1) - i === j || (this.size - 1) - i === -j) {
            this.scores[this.scores.length - 1] += (player === "p1" ? 1 : -1);
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
game.addEntry(0, 0, "p2");
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