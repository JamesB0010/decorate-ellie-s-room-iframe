export class KeyboardInputAction {
    constructor() {
        this._keyDownCallbacks = new Set();
        this._keyUpCallbacks = new Set();
    }
    addKeyDownCallback(callback) {
        this._keyDownCallbacks.add(callback);
    }
    addKeyUpCallback(callback) {
        this._keyUpCallbacks.add(callback);
    }
    executeKeyDown() {
        this._keyDownCallbacks.forEach((callback) => {
            callback();
        });
    }
    executeKeyUp() {
        this._keyUpCallbacks.forEach((callback) => {
            callback();
        });
    }
}
