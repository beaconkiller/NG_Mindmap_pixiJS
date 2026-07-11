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
        });

        this.app.stage.eventMode = 'static';


        this.srvWorld.initWorld();
        this.world = this.srvWorld.getWorld();

        // --------- debug ---------

        // let srvHelper = new SrvHelper();
    };



    initWorld() {
        let worldWidth = 20000;
        let worldHeight = 20000;

        this.world.hitArea = new Rectangle(
            -(worldWidth / 2),
            -(worldHeight / 2),
            worldWidth,
            worldHeight
        );

        this.world.on('pointerdown', this.onPanWorldStart, this);
        this.world.on('pointerup', this.onPanWorldEnd, this);
        this.world.on('wheel', this.zoomOut, this);
        this.world.on('pointermove', this.onCursorMove, this);

        this.centerWorld();

        this.worldBg = this.srvTexture.getBackgroundTexture(this.app, this.world)
        this.world.addChildAt(this.worldBg, 0);

        this.app.stage.addChild(this.world);
    };



    private onPanWorldStart(event: FederatedPointerEvent) {
        this.isPan = true;

        this.lastMousePos.x = event.global.x;
        this.lastMousePos.y = event.global.y;

        this.app.stage.on('pointermove', this.onPanMove);
        this.app.stage.on('pointerup', this.onPanWorldEnd);
        this.app.stage.on('pointerupoutside', this.onPanWorldEnd);
    };



    private onPanWorldEnd(event: FederatedPointerEvent) {
        this.isPan = false;
    };



    private centerWorld() {
        let screenW = this.app.screen.width;
        let screenH = this.app.screen.height;
        this.world.x = screenW / 2;
        this.world.y = screenH / 2;
    };



    private zoomOut(event: FederatedWheelEvent) {
        let deltaY: number = event.deltaY;
        let mouseX: number = event.global.x;
        let mouseY: number = event.global.y;

        if (deltaY > 0) {
            if (this.world.scale._x < 0.1) return;
            this.zoomScale -= deltaY / 2000
        } else {
            this.zoomScale -= deltaY / 2000;
        }

        let worldPos = this.world.toLocal(event.global);

        this.world.scale.set(this.zoomScale);
        this.world.x = mouseX - worldPos.x * this.world.scale.x;
        this.world.y = mouseY - worldPos.y * this.world.scale.y;
    };



    private onPanMove = (event: FederatedPointerEvent) => {
        if (!this.isPan) return;

        const dx = event.global.x - this.lastMousePos.x;
        const dy = event.global.y - this.lastMousePos.y;

        this.world.x += dx;
        this.world.y += dy;

        this.lastMousePos.x = event.global.x;
        this.lastMousePos.y = event.global.y;

        // this.worldBg.tilePosition.set(
        //     this.world.x,
        //     this.world.y,
        // );

        // this.worldBg.x -= dx
        // this.worldBg.y -= dy
    };



    onCursorMove(event: FederatedPointerEvent) {
        this.cursorPos.x = this.world.toLocal(event.global).x;
        this.cursorPos.y = this.world.toLocal(event.global).y;
        // console.log(this.cursorPos);
    };



    drawCenter() {
        const rect = new Graphics();
        const rectW = 400;
        const rectH = 400;
        rect.roundRect(-rectW / 2, -rectH / 2, rectW, rectH, 8);
        rect.fill('#fdfdfd');
        rect.stroke({
            color: '#ddd',
            width: 1,
        });

        rect.eventMode = 'static';
        rect.cursor = 'pointer';

        this.world.addChildAt(rect, 0);
    };


}