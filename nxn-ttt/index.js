// eslint-disable-next-line no-undef
const process = require('process');
// eslint-disable-next-line no-undef
const readline = require('node:readline');
// eslint-disable-next-line no-undef
const console = require('console');

class Game {
    constructor(size) {
        this.size = size;
        // 2D array with the inner arrays being interpreted as rows
        this.board = new Array(size).fill(null).map(() => new Array(size).fill('_'));

        // array to store the "score" of every row [0 - size-1], column [size - 2*size-1] and diagonal (last 2 elements)
        // if a score is == size or == -size, either player1 or player2 accordingly have won
        this.scores = new Array(2 * size + 2).fill(0);
    }

    /* TBD: fix aligment for double diget numbers */
    getBoard() {
        return (
            `   ${Array.from(this.board, (_, i) => i).join('  ')}\n` +
            this.board.map((row, i) => `${i} ${row.map(field => `[${field}]`).join('')}\n`).join('')
        );
    }

    printBoard() {
        console.log(this.getBoard);
    }

    #gameWon(i) {
        return Math.abs(this.scores[i]) === this.size;
    }

    /**
     * 
     * @param {*} i row index
     * @param {*} j column index
     * @returns {string|undefined|null} - player name, if a player has won by this entry, 
     *         - nothing (undefined) if the game isn't won yet, 
     *         - null if the entry isn't valid
     */
    addEntry(i, j, player) {
        const { size, board, scores } = this;
        if (board[i][j] !== '_' || i >= size || j >= size) return null;

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

/* ---------------- TAKING USER INPUT ------------------ */

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question(`What's your name?`, args => {
    game.printBoard();
    console.log(args);
    rl.close();
});