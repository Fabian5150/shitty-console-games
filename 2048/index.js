// eslint-disable-next-line no-undef
const process = require('process');
// eslint-disable-next-line no-undef
const readline = require('readline');
// eslint-disable-next-line no-undef
const console = require('console');

class Game {
    constructor(size) {
        this.size = size;
        this.row = new Array(size).fill(0);
    }

    fillRowRandom() {
        const numbers = [0, 2, 4, 8, 16];
        this.row = this.row.map(() => numbers[Math.floor(Math.random() * numbers.length)]);
    }

    mergedRow() {
        const row = this.row.filter(n => n !== 0);

        const mergedRow = [];

        for (let current = row.length - 1; current >= 0;) {
            let next = current - 1;

            if (row[next] === row[current]) {
                // Add the merged numbers to the new row and continue after them
                mergedRow.unshift(row[current] * 2);
                current = next - 1;
            } else {
                // Push only the current number to the new row and continue at the next
                mergedRow.unshift(row[current]);
                current = next;
            }
        }

        while (mergedRow.length < this.row.length) mergedRow.unshift(0);

        return mergedRow;
    }
}

// Take & convert size argument
const game = new Game((isNaN(process.argv[2]) || process.argv[2] < 3) ? 4 : Number(process.argv[2]));

game.fillRowRandom();
console.log(game.row);
console.log(game.mergedRow());

// Check for key press
/* readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) process.stdin.setRawMode(true);

process.stdin.on('keypress', (chunk, key) => {
    switch (key.name) {
        case 'w':
        case 'up':
            console.log("up");
            break;
        case 's':
        case 'down':
            console.log("down");
            break;
        case 'a':
        case 'left':
            console.log("left");
            break;
        case 'd':
        case 'right':
            console.log("right");
            break;
        case 'c':
            if (!key.ctrl) break;
        // eslint-disable-next-line no-fallthrough
        case 'q':
            process.exit();
    }
}); */