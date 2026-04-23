import * as THREE from 'three';
import { KeyboardInputAction } from './inputActions/KeyboardInputAction.js';
export class PlayerController {
    constructor(camera, renderer, startPosX, startPosZ) {
        this._height = 0.15;
        this._movementSettings = {
            movementSpeed: 0.0005,
            lookSpeed: 0.002
        };
        this._desiredMovementDirection = new THREE.Vector3();
        this._desiredLookDirection = new THREE.Vector2();
        this._actions = {
            movement: {
                left: new KeyboardInputAction(),
                right: new KeyboardInputAction(),
                forward: new KeyboardInputAction(),
                back: new KeyboardInputAction()
            }
        };
        this._keyToInputActions = {
            "w": this._actions.movement.forward,
            "ArrowUp": this._actions.movement.forward,
            "a": this._actions.movement.left,
            "ArrowLeft": this._actions.movement.left,
            "s": this._actions.movement.back,
            "ArrowDown": this._actions.movement.back,
            "d": this._actions.movement.right,
            "ArrowRight": this._actions.movement.right
        };
        this._camera = camera;
        this._camera.position.set(startPosX, this._height, startPosZ);
        this._hookIntoInputActions();
        this._hookIntoDomEvents();
    }
    _hookIntoInputActions() {
        this._actions.movement.forward.addKeyDownCallback(() => {
            this._desiredMovementDirection.z = -1;
        });
        this._actions.movement.back.addKeyDownCallback(() => {
            this._desiredMovementDirection.z = 1;
        });
        this._actions.movement.left.addKeyDownCallback(() => {
            this._desiredMovementDirection.x = -1;
        });
        this._actions.movement.right.addKeyDownCallback(() => {
            this._desiredMovementDirection.x = 1;
        });
        this._actions.movement.forward.addKeyUpCallback(() => {
            if (this._desiredMovementDirection.z < 0) {
                this._desiredMovementDirection.z = 0;
            }
        });
        this._actions.movement.back.addKeyUpCallback(() => {
            if (this._desiredMovementDirection.z > 0) {
                this._desiredMovementDirection.z = 0;
            }
        });
        this._actions.movement.left.addKeyUpCallback(() => {
            if (this._desiredMovementDirection.x < 0) {
                this._desiredMovementDirection.x = 0;
            }
        });
        this._actions.movement.right.addKeyUpCallback(() => {
            if (this._desiredMovementDirection.x > 0) {
                this._desiredMovementDirection.x = 0;
            }
        });
    }
    _hookIntoDomEvents() {
        const translateKeydownHandler = (event) => {
            console.log(`Key down: ${event.key}`);
            const inputAction = this._keyToInputActions[event.key];
            if (inputAction) {
                inputAction.executeKeyDown();
            }
        };
        const translateKeyupHandler = (event) => {
            const inputAction = this._keyToInputActions[event.key];
            if (inputAction) {
                inputAction.executeKeyUp();
            }
        };
        const mouseMoveHandler = ({ movementX, movementY }) => {
            if (movementX > 0) {
                this._desiredLookDirection.x -= 1;
            }
            else if (movementX < 0) {
                this._desiredLookDirection.x += 1;
            }
            if (movementY > 0) {
                this._desiredLookDirection.y -= 1;
            }
            else if (movementY < 0) {
                this._desiredLookDirection.y += 1;
            }
        };
        document.addEventListener("keydown", translateKeydownHandler);
        document.addEventListener("keyup", translateKeyupHandler);
        document.addEventListener("mousemove", mouseMoveHandler);
    }
    update(dt) {
        const velocity = this._desiredMovementDirection.clone().normalize().multiplyScalar(this._movementSettings.movementSpeed * dt);
        this._camera.position.add(velocity);
        this._camera.rotateY(this._desiredLookDirection.x * this._movementSettings.lookSpeed * dt);
        this._camera.rotateX(this._desiredLookDirection.y * this._movementSettings.lookSpeed * dt);
        this._desiredLookDirection = new THREE.Vector2();
    }
}
