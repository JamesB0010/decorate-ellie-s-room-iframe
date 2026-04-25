export class KeyboardInputAction 
{
    private _keyDownCallbacks = new Array<() => void>();

    private _keyUpCallbacks = new Array<() => void>();

    public addKeyDownCallback(callback: () => void): void
    {
        this._keyDownCallbacks.push(callback);
    }

    public addKeyUpCallback(callback: () => void): void
    {
        this._keyUpCallbacks.push(callback);
    }

    public executeKeyDown(): void
    {
        this._keyDownCallbacks.forEach((callback) =>
            {
                callback();
            }
        );
    }

    public executeKeyUp(): void
    {
        this._keyUpCallbacks.forEach((callback) =>
            {
                callback();
            }
        );
    }
}