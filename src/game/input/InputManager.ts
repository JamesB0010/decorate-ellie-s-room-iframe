import {KeyboardInputAction} from "./KeyboardInputAction";
import {BoundKeys, type BoundKey, type InputActionName, type InputActions} from "./types";

export class InputManager
{
    private _mouseMoveCallbacks = new Array<(event: MouseEvent) => void>();

    public readonly _actions: InputActions = {
        left: new KeyboardInputAction(),
        right: new KeyboardInputAction(),
        forward: new KeyboardInputAction(),
        back: new KeyboardInputAction()
    };

    private _keyToInputActions = {
        "w": this._actions.forward,
        "ArrowUp": this._actions.forward,
        "a": this._actions.left,
        "ArrowLeft": this._actions.left,
        "s": this._actions.back,
        "ArrowDown": this._actions.back,
        "d": this._actions.right,
        "ArrowRight": this._actions.right
    } as Record<BoundKey, KeyboardInputAction>;

    public constructor()
    {
        this._hookIntoDomEvents();
    }

    public addKeydownBindingToInputAction(action: InputActionName, callback: () => void): void
    {
        this._actions[action].addKeyDownCallback(callback);
    }

    public addKeyUpBindingToInputAction(action: InputActionName, callback: () => void): void
    {
        this._actions[action].addKeyUpCallback(callback);
    }

    public addMouseMoveCallback(callback: (event: MouseEvent) => void): void
    {
        this._mouseMoveCallbacks.push(callback);
    }

    public removeKeyDownBindingFromInputAction(action: InputActionName, callback: () => void): void
    {
        this._actions[action].removeKeyDownCallback(callback);
    }

    public removeKeyUpBindingFromInputAction(action: InputActionName, callback: () => void): void
    {
        this._actions[action].removeKeyUpCallback(callback);
    }

    public removeMouseMoveCallback(callback: (event: MouseEvent) => void): void
    {
        this._mouseMoveCallbacks = this._mouseMoveCallbacks.filter(existingCallback => existingCallback !== callback);
    }

    private _hookIntoDomEvents() {
        const translateKeydownHandler = (event: KeyboardEvent) => {
            if (event.key in BoundKeys)
            {
                const key = event.key as BoundKey;
                const inputAction = this._keyToInputActions[key];
                if (inputAction)
                {
                    inputAction.executeKeyDown();
                }
            }
        }

        const translateKeyupHandler = (event: KeyboardEvent) => {
            if (event.key in BoundKeys)
            {
                const key = event.key as BoundKey;
                const inputAction = this._keyToInputActions[key];
                if (inputAction)
                {
                    inputAction.executeKeyUp();
                }
            }
        }

        const mouseMoveHandler = (event: MouseEvent) => {
            this._mouseMoveCallbacks.forEach(callback => callback(event));
        }

        document.addEventListener("keydown", translateKeydownHandler);
        document.addEventListener("keyup", translateKeyupHandler);
        document.addEventListener("mousemove", mouseMoveHandler);
    }

}