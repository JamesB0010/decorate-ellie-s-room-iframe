export class InputAction {
    constructor() {
        this.callbacks = new Set();
    }
    addCallback(callback) {
        this.callbacks.add(callback);
    }
    execute() {
        this.callbacks.forEach((callback) => {
            callback();
        });
    }
}
