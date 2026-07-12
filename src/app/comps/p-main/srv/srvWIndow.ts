import { Injectable } from "@angular/core";
import { Application, Container, FederatedPointerEvent, FederatedWheelEvent, Graphics, Rectangle, Sprite, Texture, Text, TilingSprite, BitmapText } from "pixi.js";
import { ModelNode } from "../model/ModelPoint";
import { SrvNodeManager } from "./srvNodeManager";
import { SrvWorld } from "./srvWorld";
import { SrvOverlay } from "./srvOverlay";
import { BackdropBlurFilter, DropShadowFilter } from "pixi-filters";

@Injectable({
    providedIn: 'root'
})
export class SrvWindow {

    srvWorld!: SrvWorld;
    srvOverlay!: SrvOverlay;

    constructor(
        srvWorld: SrvWorld,
        srvOverlay: SrvOverlay,
    ) {
        this.srvWorld = srvWorld;
        this.srvOverlay = srvOverlay;
    }


    arrWindow = [];


    spawnAddNewNode(): void {
        let conWindow = new Container();

        let gWindow = new Graphics();
        gWindow.roundRect(
            this.srvWorld.srvMain.app.screen.width / 2 - 200,
            this.srvWorld.srvMain.app.screen.height / 2 - 200,
            400,
            400,
            12
        );
        gWindow.fill({
            color: 0xffffff,
            alpha: 0.15,
        });

        gWindow.stroke({
            color: '#fafafa',
            width: 2,
        })

        let textBmpTest = new BitmapText({
            text: 'Test',
            style: {
                fill: '#222',
                fontSize: 14,
            }
        });

        gWindow.filters = [
            new BackdropBlurFilter({
                strength: 8,
                quality: 4,
            }),
            new DropShadowFilter({
                blur: 2,
                color: 0x000000,
                alpha: 0.2,
                offset: { x: 0, y: 0 },
            }),
        ];

        gWindow.filterArea = new Rectangle(
            this.srvWorld.srvMain.app.screen.width / 2 - 200,
            this.srvWorld.srvMain.app.screen.height / 2 - 200,
            gWindow.width + 40,
            gWindow.height + 40,
        );

        // gWindow.filterArea = gWindow.getBounds();




        // conWindow.addChild(gWindow);
        // conWindow.addChild(textBmpTest);
        this.srvOverlay.gOverlay.addChild(gWindow);
        console.log('asd');
    };








}