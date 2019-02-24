export default class Tile {
    constructor({ tileset, tileNumber }) {
        Object.assign(this, {
            tileset,
            tileRect: tileset.getTileRect(tileNumber)
        });
    }

    draw(ctx, x, y) {
        ctx.drawImage(
            ...this.tileRect,
            x * this.tileset.tileWidth,
            y * this.tileset.tileHeight,
            this.tileset.tileWidth,
            this.tileset.tileHeight,
        );
    }
}
