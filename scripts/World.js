import Array2D from './Array2D.js';
import Tile from './Tile.js';

import { assert } from './util.js';

export default class World {
    constructor({ width, height }) {
        Object.assign(this, {
            board: new Array2D({ width, height }).map(World.generate),
            dimBoard: new Array2D({ width, height }).map(World.generateDim),
        });
    }

    static generate(_, x, y) {
        if (Math.random() > 0.8) {
            return 1;
        } else {
            return 33;
        }
    }

    static generateDim(_, x, y) {
        if (Math.random() > 0.5) {
            return 4;
        } else {
            return 33;
        }
    }

    draw(context, tileset, xPivot, yPivot) {
        for (let x = xPivot - 9; x < xPivot + 9; x++) {
            for (let y = yPivot - 5; y < yPivot + 4; y++) {
                const dimTile = new Tile({ tileset, tileNumber: this.dimBoard.get(x, y) })
                context.filter = 'brightness(50%)';
                dimTile.draw(context, x, y);

                const tile = new Tile({ tileset, tileNumber: this.board.get(x, y) })
                context.filter = 'brightness(100%)';
                tile.draw(context, x, y);
            }
        }
    }
}
