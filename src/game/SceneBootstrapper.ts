import {Group, Scene} from "three"
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { PlayerController } from './player/PlayerController';
import { InputManager } from "./input/InputManager";

type LoadedAssetNames = "room"

export class SceneBootstrapper {
    private scene: Scene;
    private gltfLoader: GLTFLoader = new GLTFLoader();
    private _loadedAssets: Record<LoadedAssetNames, Group | undefined> = {
        room: undefined
    }
    private _dependenciesLoaded = false;
    private _loadDependenciesPromise!: Promise<void>;

    constructor(scene: Scene) {
        this.scene = scene;
        this._LoadDependencies();
    }

    private async _LoadDependencies()
    {
        this._loadDependenciesPromise = new Promise((res) =>
        {
            (async()=>{
                const roomGLTF = await this.gltfLoader.loadAsync("../assets/room.glb");
                
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
        if (object)
        {
            this.scene.add(object);
        }
    }

    public async createScene(){
        if (!this._dependenciesLoaded)
        {
            await this._loadDependenciesPromise;
        }
        const inputManager = new InputManager();

        this._AddLoadedAssetToScene("room");

        const playerController = new PlayerController(inputManager, 0, 0);
        this.scene.add(playerController.body);

        return {
            playerController: playerController,
            camera: playerController.camera
        }
    }
}