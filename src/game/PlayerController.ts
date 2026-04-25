import * as THREE from 'three';
import type {InputManager} from './input/inputManager.js';

export interface PlayerControllerMovementSettings
{
    movementSpeed: number;
    horizontalLookSpeed: number;
    verticalLookSpeed: number;
}


export class PlayerController
{
    private _camera: THREE.Camera;
    public get camera(): THREE.Camera {
        return this._camera;
    }

    private _body: THREE.Group = new THREE.Group();
    public get body(): THREE.Group {
        return this._body;
    }

    private _height = 7;

    private _movementSettings: PlayerControllerMovementSettings = {
        movementSpeed: 0.02,
        horizontalLookSpeed: 0.0005,
        verticalLookSpeed: 0.0003
    };

    private _desiredMovementDirection = new THREE.Vector3();

    private _desiredLookDirection = new THREE.Vector2();

    
    public constructor(inputManager: InputManager, startPosX: number, startPosZ: number) {
        this._camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this._body.add(this._camera);
        this._body.position.set(startPosX, 0, startPosZ);
        this._camera.position.setY(this._height);

        this._hookIntoInputManagerEvents(inputManager);
    }

    private _hookIntoInputManagerEvents(inputManager: InputManager): void
    {
        inputManager.addKeydownBindingToInputAction("left", this._handleMovementActionKeyDown.bind(this, "x", -1));
        inputManager.addKeyUpBindingToInputAction("left", this._handleMovementActionKeyUp.bind(this, "x", -1));

        inputManager.addKeydownBindingToInputAction("right", this._handleMovementActionKeyDown.bind(this, "x", 1));
        inputManager.addKeyUpBindingToInputAction("right", this._handleMovementActionKeyUp.bind(this, "x", 1));

        inputManager.addKeydownBindingToInputAction("forward", this._handleMovementActionKeyDown.bind(this, "z", -1));
        inputManager.addKeyUpBindingToInputAction("forward", this._handleMovementActionKeyUp.bind(this, "z", -1));

        inputManager.addKeydownBindingToInputAction("back", this._handleMovementActionKeyDown.bind(this, "z", 1));
        inputManager.addKeyUpBindingToInputAction("back", this._handleMovementActionKeyUp.bind(this, "z", 1));

        inputManager.addMouseMoveCallback(this._onMouseMove.bind(this));
    }

    private _handleMovementActionKeyDown(axis: "x" | "z", direction: -1 | 1): void
    {
        this._desiredMovementDirection[axis] = direction;
    }

    private _handleMovementActionKeyUp(axis: "x" | "z", direction: -1 | 1): void
    {
        if (this._desiredMovementDirection[axis] === direction)
        {
            this._desiredMovementDirection[axis] = 0;
        }
    }

    private _onMouseMove({movementX, movementY}: MouseEvent): void
    {
        if (movementX > 0) {
            this._desiredLookDirection.x -= 1;
        } else if (movementX < 0) {
            this._desiredLookDirection.x += 1;
        }

        if (movementY > 0) {
            this._desiredLookDirection.y -= 1;
        } else if (movementY < 0) {
            this._desiredLookDirection.y += 1;
        }
    }

    public update(dt: number) {
        const {movementSpeed, horizontalLookSpeed, verticalLookSpeed} = this._movementSettings;

        const velocity = this._desiredMovementDirection.clone()
            .normalize()
            .applyQuaternion(this._body.quaternion)
            .multiplyScalar(movementSpeed * dt);
        this._body.position.add(velocity);

        this._body.rotateY(this._desiredLookDirection.x * horizontalLookSpeed * dt);
        this._camera.rotateX(this._desiredLookDirection.y * verticalLookSpeed * dt);

        this._desiredLookDirection.multiplyScalar(0.7);
    }
}