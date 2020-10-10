import Game from './Game.js';
import Screen from './Screen.js';
import Tile from './Tile.js';
import Tileset from './Tileset.js';
import VisualLog from './VisualLog.js';
import World from './World.js';

import { loadImage } from './util.js';

const TILE_HEIGHT = 16;
const TILE_WIDTH = 16;
const WORLD_DIMENSION = 1024;

class Pawn {
    constructor({ x = 0, y = 0, appearance }) {
        Object.assign(this, { x, y, appearance });
    }

    draw(screen) {
        screen.drawBright(ctx => {
            this.appearance.draw(ctx, this.x, this.y);
        });
    }
}

class GameDelegate {
    constructor({ tileset, world }) {
        Object.assign(this, {
            tileset,
            world,

            messageHistory: [
                'You wake up after a restless dream',
                'Your hands are empty',
                'You don\'t really know where you are'
            ],
            pawn: new Pawn({
                x: 25,
                y: 25,
                appearance: new Tile({ tileset, tileNumber: 20 })
            }),
        });
    }

    message(text) {
        this.messageHistory.shift();
        this.messageHistory.push(text);
    }

    onKeyPressed(key) {
        switch (key) {
        case '?':
        case '/':
            this.message('HELP: Use HJKL for movement');
            this.message('Use QWE A D ZXC on surrounding tiles');
            this.message('to act on them');
            break;

        case 'h':
            this.message('You go west');
            this.pawn.x -= 1;
            break;
        case 'j':
            this.message('You go south');
            this.pawn.y += 1;
            break;
        case 'k':
            this.message('You go north');
            this.pawn.y -= 1;
            break;
        case 'l':
            this.message('You go east');
            this.pawn.x += 1;
            break;
        case '`':
            window.log.toggle();
        default:
            this.message('Press <?> for help');
            break;
        }
    }

    drawMessages(screen) {
        screen.drawWith({ font: '10px Helvetica', fillStyle: 'white', filter: 'brightness(25%)' }, ctx => {
            ctx.fillText(this.messageHistory[0], TILE_WIDTH, screen.height - TILE_HEIGHT * 2.5);
        });

        screen.drawWith({ font: '10px Helvetica', fillStyle: 'white', filter: 'brightness(50%)' }, ctx => {
            ctx.fillText(this.messageHistory[1], TILE_WIDTH, screen.height - TILE_HEIGHT * 1.5);
        });

        screen.drawWith({ font: '10px Helvetica', fillStyle: 'white' }, ctx => {
            ctx.fillText(this.messageHistory[2], TILE_WIDTH, screen.height - TILE_HEIGHT * 0.5);
        });
    }

    draw(screen) {
        screen.clear();

        screen.draw(ctx => {
            ctx.translate(
                -this.pawn.x * TILE_WIDTH + screen.width / 2,
                -this.pawn.y * TILE_HEIGHT + screen.height / 2 - 1.5 * TILE_HEIGHT
            );

            screen.drawDim(ctx => {
                ctx.drawImage(...this.tileset.getTileRect(21), TILE_WIDTH, TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
            });

            // screen.drawBright(ctx => {
            screen.draw(ctx => {
                this.world.draw(ctx, this.tileset, this.pawn.x, this.pawn.y);
            });

            this.pawn.draw(screen);
        });

        this.drawMessages(screen);
    }
}

function filterImage(image, filter) {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.filter = filter;
}

VisualLog.instance = new VisualLog('log');
const log = VisualLog.instance;
log.write('done');

log.write('\nLoading tiles...');

loadImage('/Tiles.png').then(image => {
    log.write('done');
    log.write('\nGenerating world...');
    const tileset = new Tileset({ image, tileWidth: TILE_WIDTH, tileHeight: TILE_HEIGHT });
    const world = new World({ width: WORLD_DIMENSION, height: WORLD_DIMENSION });
    const gameDelegate = new GameDelegate({ world, tileset });

    const screen = new Screen(document.querySelector('#view'));
    const game = new Game({ delegate: gameDelegate, screen });
    log.write('done');

    log.hide();
    game.animate();

    window.addEventListener('keypress', event => game.processKeypress(event));
})
