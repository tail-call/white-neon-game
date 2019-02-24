import { assert } from './util.js';

export default class Array2D {
    constructor({ width, height }) {
        if (width <= 0 || height <= 0) {
            throw new TypeError(
                `Array2D dimensions must be positive integers, instead got (${width}, ${height})`
            );
        }

        Object.assign(this, {
            width,
            height,
            internalArray: new Array(width * height)
        });
    }

    map(mapper) {
        let copy = new Array2D({ width: this.width, height: this.height });

        this.forEach((item, x, y) => {
            copy.set(x, y, mapper(item, x, y, this));
        });

        return copy;
    }

    forEach(callback) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                callback(this.getUnsafe(x, y), x, y, this);
            }
        }
    }

    checkIndexesBounds(x, y) {
        assert(x >= 0, y >= 0, x < this.width, y < this.height, {
            otherwise: `Array2D: index out of bounds (${x}, ${y})`
        });
    }

    internalIndexFrom(x, y) {
        return y * this.width + x;
    }

    setUnsafe(x, y, value) {
        this.internalArray[this.internalIndexFrom(x, y)] = value;
        return value;
    }

    set(x, y, value) {
        this.checkIndexesBounds(x, y);

        return this.setUnsafe(x, y, value);
    }

    getUnsafe(x, y) {
        return this.internalArray[this.internalIndexFrom(x, y)];
    }

    get(x, y) {
        this.checkIndexesBounds(x, y);

        return this.getUnsafe(x, y);
    }

    getWrapped(x, y) {
        throw Error('Array2D#getWrapped(): not implemented');
    }
}
