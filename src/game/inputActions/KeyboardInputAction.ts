export class KeyboardInputAction 
{
    private _keyDownCallbacks = new Set<() => void>();

    private _keyUpCallbacks = new Set<() => void>();

    public addKeyDownCallback(callback: () => void): void
    {
        this._keyDownCallbacks.add(callback);
    }

    public addKeyUpCallback(callback: () => void): void
    {
        this._keyUpCallbacks.add(callback);
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