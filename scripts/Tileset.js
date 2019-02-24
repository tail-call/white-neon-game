import { idiv } from './util.js';

export default class Tileset {
    constructor({ image, tileWidth, tileHeight }) {
        Object.assign(this, {
            image,
            tileWidth,
            tileHeight,
            rows: (image.height / tileHeight) | 0,
            columns: (image.width / tileWidth) | 0,
        });

        console.log(this.columns, this.rows);
    }

    getTileRect(number) {
        const [row, column] = idiv(number, this.columns);
        return [
            this.image,
            column * this.tileWidth,
            row * this.tileHeight,
            this.tileWidth,
            this.tileHeight,
        ];
    }
}
