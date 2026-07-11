import { Injectable } from "@angular/core";
import { Container, FederatedPointerEvent, FederatedWheelEvent, Graphics, Rectangle, Sprite, Texture, Text, TilingSprite } from "pixi.js";
import { ModelNode } from "../model/ModelPoint";
import { SrvNodeManager } from "./srvNodeManager";
import { srvTexture } from "./srvTexture";
import { ModelCursorPosition, ModelWorldMode } from "../model/ModelWorld";
import { srvNodeData } from "./srvNodeData";
import { SrvMain } from "./srvMain";
import { SrvLines } from "./srvLines";
import { SrvOverlay } from "./srvOverlay";

@Injectable({
    providedIn: 'root'
})
export class SrvWorld {
    world: Container = new Container();
    mode: ModelWorldMode = { mode: "VIEW" };
    srvMain!: SrvMain;
    srvLines!: SrvLines;
    srvTexture!: srvTexture;
    srvNodeManager!: SrvNodeManager;
    srvOverlay!: SrvOverlay;
    worldBg!: TilingSprite;
    cursorPos: ModelCursorPosition = {
        x: 0,
        y: 0
    };
    isPan: boolean = false;
    zoomScale: number = 1;
    isDragging: boolean = false;
    draggedNode: Container | null = null;

    private lastMousePos = { x: 0, y: 0 };


    constructor(
        srvMain: SrvMain,
    ) {
        this.srvMain = srvMain;
        this.srvNodeManager = new SrvNodeManager(this.srvMain);
        this.srvLines = new SrvLines(this, this.srvNodeManager);
        this.srvOverlay = new SrvOverlay(this);
        this.srvTexture = new srvTexture();
    }

    initWorld() {
        // console.log(this);

        let worldWidth = 20000;
        let worldHeight = 20000;

        this.world.hitArea = new Rectangle(
            -(worldWidth / 2),
            -(worldHeight / 2),
            worldWidth,
            worldHeight
        );


        this.world.eventMode = 'static';
        this.world.on('pointerdown', this.onPointerDown, this);
        this.world.on('pointerup', this.onPointerUp, this);
        this.world.on('wheel', this.onZoom, this);
        this.world.on('pointermove', this.onCursorMove, this);

        this.centerWorld();

        this.worldBg = this.srvTexture.getBackgroundTexture(this.srvMain.app, this.world)
        this.world.addChildAt(this.worldBg, 0);

        this.srvMain.app.stage.addChild(this.world);
        this.loadData();
    };



    private onCursorMove(event: FederatedPointerEvent) {
        this.cursorPos.x = this.world.toLocal(event.global).x;
        this.cursorPos.y = this.world.toLocal(event.global).y;
    }



    private onPointerUp() {
        this.isPan = false;
        // this.srvNodeManager.clearDragged();
        this.world.once('pointerup', this.onPanWorldEnd, this);
        this.world.once('pointerup', this.onDragNodeEnd, this);
    }



    private onPointerDown(event: FederatedPointerEvent) {
        if (this.srvNodeManager.draggedNode != null) {
            this.isDragging = true;
            this.world.on('pointermove', this.onDragNodeStart, this);
            this.world.once('pointerup', this.onDragNodeEnd, this);
            return;
        };

        this.isPan = true;

        this.lastMousePos.x = event.global.x;
        this.lastMousePos.y = event.global.y;

        this.world.on('pointermove', this.onPanMove, this);
        this.world.once('pointerup', this.onPanWorldEnd, this);
        // this.world.once('pointerupoutside', this.onPanWorldEnd);
        return;
    };



    private onPanMove = (event: FederatedPointerEvent) => {
        if (!this.isPan) return;

        const dx = event.global.x - this.lastMousePos.x;
        const dy = event.global.y - this.lastMousePos.y;

        this.world.x += dx;
        this.world.y += dy;

        this.lastMousePos.x = event.global.x;
        this.lastMousePos.y = event.global.y;
    };



    onDragNodeStart() {
        if (!this.isDragging) return;
        let dragged = this.srvNodeManager.draggedNode;
        let container = this.srvNodeManager.findConByNodeId(dragged!.id);
        container!.x = this.cursorPos.x;
        container!.y = this.cursorPos.y;
    }



    private onDragNodeEnd(event: FederatedPointerEvent) {
        this.isPan = false;
        this.isDragging = false;

        if (this.world) {
            this.srvNodeManager.clearDragged();
            this.world.off('pointermove', this.onPanMove);
            this.world.off('pointermove', this.onDragNodeStart);
        }
    };




    private onPanWorldEnd(event: FederatedPointerEvent) {
        this.isPan = false;
        this.isDragging = false;
        // console.log(this.srvNodeManager);
        if (this.world) {
            // this.srvNodeManager.clearDragged();
            this.world.off('pointermove', this.onPanMove);
            this.world.off('pointermove', this.onDragNodeStart);
        }
    };



    private onZoom(event: FederatedWheelEvent) {
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



    private centerWorld() {
        let screenW = this.srvMain.app.screen.width;
        let screenH = this.srvMain.app.screen.height;
        this.world.x = screenW / 2;
        this.world.y = screenH / 2;
    };



    private loadData() {
        let arr: Array<ModelNode> = new srvNodeData().getData();
        arr.forEach((el) => {
            let nodeContainer = this.srvNodeManager.drawNode(el);
            this.world.addChild(nodeContainer);
        })
        this.srvLines.drawLinesAll(this.world);
    }







    getWorld(): Container {
        return this.world;
    };







}