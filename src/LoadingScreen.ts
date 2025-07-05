import { ILoadingScreen, Texture } from "@babylonjs/core";

export class LoadingScreen implements ILoadingScreen {
    public loadingUIBackgroundColor: string = "";
    BackgroundDiv;
    ProgressDiv;

    constructor(
        scene: any,
        public loadingUIText: string,
    ) {
        //background
        this.BackgroundDiv = document.createElement("div");
        this.BackgroundDiv.style.position = "fixed";
        this.BackgroundDiv.style.top = "0";
        this.BackgroundDiv.style.left = "0";
        this.BackgroundDiv.style.width = "100%";
        this.BackgroundDiv.style.backgroundRepeat = "no-repeat";
        this.BackgroundDiv.style.height = "100%";
        this.BackgroundDiv.style.backgroundSize = "100% 100%";
        this.BackgroundDiv.style.backgroundPosition = "center center";
        const backgroundTexture = new Texture(
            "assets/loadscreeneasternkingdom.png",
            scene,
        );
        this.BackgroundDiv.style.backgroundImage = `url(${backgroundTexture.url})`;

        //progress bar
        this.ProgressDiv = document.createElement("div");
        this.ProgressDiv.style.position = "absolute";
        this.ProgressDiv.style.top = "0";
        this.ProgressDiv.style.left = "0";
        this.ProgressDiv.style.width = "100%";
        this.ProgressDiv.style.height = "100%";
        this.ProgressDiv.style.backgroundRepeat = "no-repeat";
        const progressTexture = new Texture(
            "assets/loading-barborder.png",
            scene,
        );
        this.ProgressDiv.style.backgroundImage = `url(${progressTexture.url})`;

        document.body.appendChild(this.BackgroundDiv);
        document.body.appendChild(this.ProgressDiv);
    }
    public displayLoadingUI() {
        //this.BackgroundDiv.style.display = "block";
        this.ProgressDiv.style.display = "block";
    }

    public hideLoadingUI() {
        this.BackgroundDiv.style.display = "none";
        this.ProgressDiv.style.display = "none";
    }
}
