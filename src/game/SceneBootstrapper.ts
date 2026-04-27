import {Group, Scene} from "three"
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { PlayerController, type playerControllerConstructorParams } from './player/PlayerController';
import { InputManager } from "./input/InputManager";
import { logicObject } from "./LogicObject";

type LoadedAssetNames = "room"

export class SceneBootstrapper {
    private _scene: Scene;
    private _gltfLoader: GLTFLoader = new GLTFLoader();
    private _loadedAssets: Record<LoadedAssetNames, Group | undefined> = {
        room: undefined
    }
    private _dependenciesLoaded = false;
    private _loadDependenciesPromise!: Promise<void>;

    private _inputManager: InputManager;

    private logicObjects: logicObject[] = [];

    constructor(scene: Scene, inputManager: InputManager) {
        this._scene = scene;
        this._inputManager = inputManager;
        this._LoadDependencies();
    }

    private async _LoadDependencies()
    {
        this._loadDependenciesPromise = new Promise((res) =>
        {
            (async()=>{
                const roomGLTF = await this._gltfLoader.loadAsync("../assets/room.glb");
                
                const room = roomGLTF.scene;
                room.scale.set(40, 40, 40);
                this._loadedAssets.room = room;
                this._dependenciesLoaded = true;
                res();
            })();
        })
    }

    private _AddLoadedAssetToScene(name: LoadedAssetNames)
    {
        const object = this._loadedAssets[name]; 
        if (object && !this._scene.children.includes(object))
        {
            this._scene.add(object);
        }
    }

    public async createScene(){
        if (!this._dependenciesLoaded)
        {
            await this._loadDependenciesPromise;
        }

        this._clearLogicObjects();

        this._AddLoadedAssetToScene("room");

        const playerController = this.createLogicObject<PlayerController, playerControllerConstructorParams>(PlayerController, this._inputManager, this._scene, 0, 0);

        return {
            playerController: playerController,
            camera: playerController.camera
        }
    }

    private _clearLogicObjects()
    {
        for (const logicObject of this.logicObjects)
        {
            logicObject.destroy(this._scene);
        }
        this.logicObjects = [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private createLogicObject<T extends logicObject, ConstructorArgs extends unknown[]>(LogicObjectConstructor: new (...args: ConstructorArgs) => T, ...constructorArgs: ConstructorArgs): T
    {
        const logicObject = new LogicObjectConstructor(...constructorArgs);
        this.logicObjects.push(logicObject);
        return logicObject as T;
    }
}