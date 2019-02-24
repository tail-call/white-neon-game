export default class Game {
    constructor({ screen, delegate, world }) {
        Object.assign(this, {
            screen,
            delegate,
            world,

            paused: false,
            frameCounter: 0,
            fps: 0,
        });

        setTimeout(() => {
            this.fps = this.frameCounter;
            this.frameCounter = 0;
        }, 1000);
    }

    animate() {
        if (this.paused) return;

        window.requestAnimationFrame(() => {
            this.draw();
            this.animate();
        });
    }

    draw() {
        this.delegate.draw(this.screen);
        this.drawFPS();
        this.frameCounter += 1;
    }

    drawError(errorMessage) {
        this.screen.drawWith({ font: '10px monospace', fillStyle: 'white' }, ctx => {
            ctx.fillText(errorMessage, 4, 4);
        });
    }

    drawFPS() {
        this.screen.drawWith({ font: '10px monospace', fillStyle: 'white' }, ctx => {
            ctx.fillText(`FPS: ${this.fps}`, 4, 14);
        });
    }

    processKeypress(event) {
        this.delegate.onKeyPressed(event.key);
    }
}
