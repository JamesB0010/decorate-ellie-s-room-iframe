import type { KeyboardInputAction } from "./KeyboardInputAction";

export const BoundKeys = {
    w: "w",
    a: "a",
    s: "s",
    d: "d",
    ArrowUp: "ArrowUp",
    ArrowLeft: "ArrowLeft",
    ArrowDown: "ArrowDown",
    ArrowRight: "ArrowRight"
}

export type BoundKey = keyof typeof BoundKeys;

export interface InputActions{
    left: KeyboardInputAction
    right: KeyboardInputAction
    forward: KeyboardInputAction
    back: KeyboardInputAction
};

export type InputActionName = keyof InputActions;