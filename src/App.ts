import {
    Engine,
    AssetsManager,
    Scene,
    //FollowCamera,
    FreeCamera,
    Vector3,
    HemisphericLight,
    SceneLoader,
    ImportMeshAsync,
    StandardMaterial,
    Texture,
    ActionManager,
    ExecuteCodeAction,
    AssetsManager,
    VirtualJoystick,
} from "@babylonjs/core";
import { LoadingScreen } from "./LoadingScreen";
import ADTFileLoader from "adtloader";
import WDTFileLoader from "wdtloader";
//import "@babylonjs/loaders/glTF/2.0/glTFLoader";
import { HavokPlugin } from "@babylonjs/core/Physics/v2/Plugins/havokPlugin";
import HavokPhysics from "@babylonjs/havok";
import { AdvancedDynamicTexture, Ellipse, Control } from "@babylonjs/gui/2D";

export default class App {
    engine: Engine;
    scene: Scene;

    constructor(readonly canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas);
        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        let ADTLoader = new ADTFileLoader();
        let WDTLoader = new WDTFileLoader();
        SceneLoader.RegisterPlugin(ADTLoader);
        SceneLoader.RegisterPlugin(WDTLoader);
        this.scene = createScene(ADTLoader, this.engine, this.engine);
    }

    run() {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}
let createScene = function (
    adtLoader: ADTFileLoader,
    engine: Engine,
    canvas: HTMLCanvasElement,
) {
    var scene = new Scene(engine);

    HavokPhysics().then((havok) => {
        let physicsPlugin = new HavokPlugin(true, havok);
        scene.enablePhysics(gravity, physicsPlugin);
    });

    var camera = new FreeCamera(
        "freeCamera",
        new Vector3(-5830, 5, -10),
        scene,
    );
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    const gravity = new Vector3(0, -9.81, 0);

    ImportMeshAsync(
        "http://127.0.0.1:8080/assets/World/Maps/Azeroth/Azeroth_32_42.adt",
        scene,
    ).catch((err) => console.log(err));

    return scene;
};

function detectHost() {
    if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
    ) {
        return "mobile";
    } else if (
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i)
    ) {
        return "tablet";
    } else {
        return "desktop";
    }
}
