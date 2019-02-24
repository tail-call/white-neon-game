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
        callback(this.context);
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
