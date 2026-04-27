import type { Scene } from "three";

export abstract class logicObject
{
    public abstract destroy(scene: Scene): void;
}