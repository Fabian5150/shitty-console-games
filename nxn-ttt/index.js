// eslint-disable-next-line no-undef
const process = require('process');
// eslint-disable-next-line no-undef
const readlineSync = require('readline-sync');
// eslint-disable-next-line no-undef
const console = require('console');

const PLAYER1 = "player 1";
const PLAYER2 = "player 2";

class Game {
    constructor(size) {
        this.size = size;
        // 2D array with the inner arrays being interpreted as rows
        this.board = new Array(size).fill(null).map(() => new Array(size).fill('_'));

        // array to store the "score" of every row [0 - size-1], column [size - 2*size-1] and diagonal (last 2 elements)
        // if a score is == size or == -size, either player1 or player2 accordingly have won
        this.scores = new Array(2 * size + 2).fill(0);
        this.entries = 0;
    }

    /* TBD: fix aligment for double digit numbers */
    getBoard() {
        return (
            `   ${Array.from(this.board, (_, i) => i).join('  ')}\n` +
            this.board.map((row, i) => `${i} ${row.map(field => `[${field}]`).join('')}\n`).join('')
        );
    }

    printBoard() {
        console.log(this.getBoard());
    }

    #gameWon(i) {
        return Math.abs(this.scores[i]) === this.size;
    }

    /**
     * 
     * @param {*} i row index
     * @param {*} j column index
     * @returns {string|undefined|null|-1} 
     *         - player name, if a player has won by this entry, 
     *         - nothing (undefined) if the game isn't won yet, 
     *         - null if the entry isn't valid
     *         - -1 if the game is over and nobody won
     */
    addEntry(i, j, player) {
        const { size, board, scores } = this;
        if (i >= size || j >= size || board[i][j] !== '_' ) return null;

        /* add to board */
        board[i][j] = player === PLAYER1 ? "x" : "o";

        /* add score to the row */
        scores[i] += (player === PLAYER1 ? 1 : -1);
        if (this.#gameWon(i)) return player;

        /* add score to the column */
        scores[size + j] += (player === PLAYER1 ? 1 : -1);
        if (this.#gameWon(size + j)) return player;

        /* add score to the diagonal */
        // check for first diagonal
        if (i === j) {
            scores[scores.length - 2] += (player === PLAYER1 ? 1 : -1);
            if (this.#gameWon(scores.length - 2)) return player;
        }

        // check for second diagonal
        if (Math.abs(size - 1 - i) === j) {
            scores[scores.length - 1] += (player === PLAYER1 ? 1 : -1);
            if (this.#gameWon(scores.length - 1)) return player;
        }
    
        this.entries++;
        if(this.entries === size * size) return -1;
    }
}

let game = new Game(Number(process.argv[2] ?? 3));

/* ---------------- TAKING USER INPUT ------------------ */

const playersTurn = (player) => {
    console.log(`It's ${player}'s turn!`);
    const _field = readlineSync.question("Which field to you choose? <row> <column>\n");
    
    const field = _field.trim().replace(/\s+/g, " ").split(" ");
    const entry = game.addEntry(Number(field[0]), Number(field[1]), player);
    
    if(entry === null){
        console.log("Invald input or field already taken :/ Please try again.\n");
        return playersTurn(player);
    }

    game.printBoard();

    if(entry === player) console.log(`Congratualtions, ${player} has won the game!`);
    if(entry === -1) console.log("Looks like the game is over and nobody won. :/")

    return entry;
}

game.printBoard();
while(true){
    const turnP1 = playersTurn(PLAYER1);
    if(turnP1 === PLAYER1 || turnP1 === -1) break;
    
    const turnP2 = playersTurn(PLAYER2);
    if(turnP2 === PLAYER2 || turnP2 === -1) break;
}