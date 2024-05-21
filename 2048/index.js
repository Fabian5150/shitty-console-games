// eslint-disable-next-line no-undef
const process = require('process');
// eslint-disable-next-line no-undef
const readline = require('readline');
// eslint-disable-next-line no-undef
const console = require('console');


// Check for key press
readline.emitKeypressEvents(process.stdin);

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
});