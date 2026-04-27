import { Scene, Group, Camera, Vector2, Vector3, PerspectiveCamera } from 'three';
import {InputManager} from '../input/InputManager';
import { logicObject } from '../LogicObject';

export interface PlayerControllerMovementSettings
{
    movementSpeed: number;
    horizontalLookSpeed: number;
    verticalLookSpeed: number;
}

export type playerControllerConstructorParams = [InputManager, Scene, number, number];

export class PlayerController extends logicObject
{
    private _camera: Camera;
    public get camera(): Camera {
        return this._camera;
    }

    private _body: Group = new Group();
    public get body(): Group {
        return this._body;
    }

    private _height = 7;

    private _movementSettings: PlayerControllerMovementSettings = {
        movementSpeed: 0.02,
        horizontalLookSpeed: 0.0005,
        verticalLookSpeed: 0.0003
    };

    private _desiredMovementDirection = new Vector3();

    private _desiredLookDirection = new Vector2();

    private _inputManager: InputManager;

    
    public constructor(inputManager: InputManager, scene: Scene, startPosX: number, startPosZ: number) {
        super();
        this._inputManager = inputManager;
        this._camera = new PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this._body.add(this._camera);
        this._body.position.set(startPosX, 0, startPosZ);
        this._camera.position.setY(this._height);

        scene.add(this._body);

        this._hookIntoInputManagerEvents(inputManager);
    }

    private _handleMovementActionKeyDownLeftBound = this._handleMovementActionKeyDown.bind(this, "x", -1);
    private _handleMovementActionKeyUpLeftBound = this._handleMovementActionKeyUp.bind(this, "x", -1);
    private _handleMovementActionKeyDownRightBound = this._handleMovementActionKeyDown.bind(this, "x", 1);
    private _handleMovementActionKeyUpRightBound = this._handleMovementActionKeyUp.bind(this, "x", 1);
    private _handleMovementActionKeyDownForwardBound = this._handleMovementActionKeyDown.bind(this, "z", -1);
    private _handleMovementActionKeyUpForwardBound = this._handleMovementActionKeyUp.bind(this, "z", -1);
    private _handleMovementActionKeyDownBackBound = this._handleMovementActionKeyDown.bind(this, "z", 1);
    private _handleMovementActionKeyUpBackBound = this._handleMovementActionKeyUp.bind(this, "z", 1);
    private _onMouseMoveBound = this._onMouseMove.bind(this);

    private _hookIntoInputManagerEvents(inputManager: InputManager): void
    {
        inputManager.addKeydownBindingToInputAction("left", this._handleMovementActionKeyDownLeftBound);
        inputManager.addKeyUpBindingToInputAction("left", this._handleMovementActionKeyUpLeftBound);

        inputManager.addKeydownBindingToInputAction("right", this._handleMovementActionKeyDownRightBound);
        inputManager.addKeyUpBindingToInputAction("right", this._handleMovementActionKeyUpRightBound);

        inputManager.addKeydownBindingToInputAction("forward", this._handleMovementActionKeyDownForwardBound);
        inputManager.addKeyUpBindingToInputAction("forward", this._handleMovementActionKeyUpForwardBound);

        inputManager.addKeydownBindingToInputAction("back", this._handleMovementActionKeyDownBackBound);
        inputManager.addKeyUpBindingToInputAction("back", this._handleMovementActionKeyUpBackBound);

        inputManager.addMouseMoveCallback(this._onMouseMoveBound);
    }

    private _unhookFromInputManagerEvents(inputManager: InputManager): void
    {
       inputManager.removeKeyDownBindingFromInputAction("left", this._handleMovementActionKeyDownLeftBound); 
       inputManager.removeKeyUpBindingFromInputAction("left", this._handleMovementActionKeyUpLeftBound);
       inputManager.removeKeyDownBindingFromInputAction("right", this._handleMovementActionKeyDownRightBound);
       inputManager.removeKeyUpBindingFromInputAction("right", this._handleMovementActionKeyUpRightBound);
       inputManager.removeKeyDownBindingFromInputAction("forward", this._handleMovementActionKeyDownForwardBound);
       inputManager.removeKeyUpBindingFromInputAction("forward", this._handleMovementActionKeyUpForwardBound);
       inputManager.removeKeyDownBindingFromInputAction("back", this._handleMovementActionKeyDownBackBound);
       inputManager.removeKeyUpBindingFromInputAction("back", this._handleMovementActionKeyUpBackBound);
       inputManager.removeMouseMoveCallback(this._onMouseMoveBound);
    }

    private _handleMovementActionKeyDown(axis: "x" | "z", direction: -1 | 1): void
    {
        this._desiredMovementDirection[axis] = direction;
        console.log("movement down");
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

    public destroy(scene: Scene): void {
        this._unhookFromInputManagerEvents(this._inputManager);
        scene.remove(this._body);
        scene.remove(this._camera);
    }
}