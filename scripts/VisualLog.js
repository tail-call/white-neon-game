export default class VisualLog {
    constructor(id) {
        this.element = document.getElementById(id);
    }

    cook(text) {
        return text.replace(/\n/g, '<br>');
    }

    write(text) {
        this.element.innerHTML += this.cook(text);
    }

    hide() {
        this.element.style.display = 'none';
    }

    toggle() {
        if (this.element.style.display === 'none') {
            this.element.style.display = 'block';
        } else {
            this.element.style.display = 'none';
        }
    }
}
