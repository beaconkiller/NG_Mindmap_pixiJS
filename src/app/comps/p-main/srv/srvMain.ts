import { Injectable } from "@angular/core";
import { Application, Container, FederatedPointerEvent, FederatedWheelEvent, Graphics, Rectangle, Sprite, Texture, Text, TilingSprite } from "pixi.js";
import { ModelNode } from "../model/ModelPoint";
import { SrvNodeManager } from "./srvNodeManager";
import { srvTexture } from "./srvTexture";
import { ModelCursorPosition } from "../model/ModelWorld";
import { SrvWorld } from "./srvWorld";
import { SrvHelper } from "./srvHelper";

@Injectable({
    providedIn: 'root'
})
export class SrvMain {

    app!: Application;
    world!: Container;
    isPan: boolean = false;
    ticker: number = 0;
    activeNode: ModelNode | null = null;
    zoomScale: number = 1;
    SrvNodeManager!: SrvNodeManager;
    srvTexture: srvTexture = new srvTexture();
    srvWorld: SrvWorld = new SrvWorld(this);
    worldBg!: TilingSprite;
    cursorPos: ModelCursorPosition = {
        x: 0,
        y: 0
    };
    private lastMousePos = { x: 0, y: 0 };

    constructor(
    ) {
        this.app = new Application();
        this.SrvNodeManager = new SrvNodeManager(this);
    };



    async initialize(canvas: HTMLCanvasElement) {

        await this.app.init({
            canvas: canvas,
            resizeTo: window,
            background: '#fafafa',
            antialias: true,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            useBackBuffer: true,
        });

        this.app.stage.eventMode = 'static';


        this.srvWorld.initWorld();
        this.world = this.srvWorld.getWorld();

        // --------- debug ---------

        // let srvHelper = new SrvHelper();
    };



}