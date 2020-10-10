export default class Screen {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    }

    get height() {
        return this.canvas.height;
    }

    get width() {
        return this.canvas.width;
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawWith(options, callback) {
        this.context.save();
        Object.assign(this.context, options);
        callback(this.context, this.canvas);
        this.context.restore();
    }

    draw(callback) {
        this.context.save();
        callback(this.context);
        this.context.restore();
    }

    drawBright(callback) {
        this.drawWith({ filter: 'blur(1px)' }, callback);
        this.drawWith({}, callback);
    }

    drawDim(callback) {
        this.drawWith({ filter: 'brightness(50%)' }, callback);
    }
}


function Screen(canvas) {
	this.canvas = canvas;
	this.context = canvas.getContext('2d');
}

package.define('getHeight', Screen, () => {
	return this.canvas.height;
});

package.define('getWidth', Screen, () => {
	return this.canvas.width;
});

package.define('clear', Screen, () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
});

package.define('drawWith', Screen, (options, callback) => {
    this.context.save();
    Object.assign(this.context, options);
    callback(this.context, this.canvas);
    this.context.restore();
});

package.define('draw', Screen, (callback) => {
    this.context.save();
    callback(this.context);
    this.context.restore();
});

package.define('drawBright', Screen, (callback) => {
    this.drawWith({ filter: 'blur(1px)' }, callback);
    this.drawWith({}, callback);
});

package.define('drawDim', Screen, (callback) => {
    this.drawWith({ filter: 'brightness(50%)' }, callback);
});
