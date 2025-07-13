import {
    Scene,
    FreeCamera,
    Vector3,
    HemisphericLight,
    ImportMeshAsync,
} from "@babylonjs/core";
import { HavokPlugin } from "@babylonjs/core/Physics/v2/Plugins/havokPlugin";
import HavokPhysics from "@babylonjs/havok";

export default class App {
    engine: Engine;
    scene: Scene;

    constructor(readonly canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas);
        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        this.scene = createScene(this.engine, this.engine);
    }

    run() {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}
const createScene = function (engine: Engine, canvas: HTMLCanvasElement) {
    const scene = new Scene(engine);

    HavokPhysics()
        .then((havok) => {
            const physicsPlugin = new HavokPlugin(true, havok);
            scene.enablePhysics(gravity, physicsPlugin);
        })
        .catch((err: unknown) => {
            console.log(err);
        });

    const camera = new FreeCamera(
        "freeCamera",
        new Vector3(-5830, 5, -10),
        scene,
    );
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    const gravity = new Vector3(0, -9.81, 0);

    ImportMeshAsync(
        "http://127.0.0.1:8080/assets/World/Maps/Azeroth/Azeroth_32_42.adt",
        scene,
    ).catch((err: unknown) => {
        console.log(err);
    });

    return scene;
};
