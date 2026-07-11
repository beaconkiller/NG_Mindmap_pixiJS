import { BitmapText, Container, Graphics } from "pixi.js";
import { SrvMain } from "./srvMain";
import { SrvNodeManager } from "./srvNodeManager";
import { SrvWorld } from "./srvWorld";
import { DropShadowFilter } from "pixi-filters";

export class SrvOverlay {
    srvWorld!: SrvWorld;
    srvNodeManager!: SrvNodeManager;
    conOverlay!: Container;
    gOverlay!: Graphics;
    screenOffset: number = 40;
    constructor(
        srvWorld: SrvWorld,
    ) {
        this.srvWorld = srvWorld;
        this.srvNodeManager = this.srvWorld.srvNodeManager;
    };



    initOverlay() {
        this.conOverlay = new Container({
            x: 0,
            y: 0,
        });

        this.gOverlay = new Graphics();
        this.gOverlay.rect(-screen.availWidth / 2, -screen.availHeight / 2, screen.availWidth, screen.availHeight);
        this.gOverlay.fill({
            color: '#000',
            alpha: 0,
        });


        this.buildButtons();

        this.conOverlay.addChild(this.gOverlay);
        this.srvWorld.world.addChildAt(this.conOverlay, 1);
    }



    buildButtons() {
        let padding = 20;

        let conButton = new Container();

        let textBmp = new BitmapText({
            text: 'Add new node',
            style: {
                fill: '#fff',
                fontSize: 14,
            }
        });

        textBmp.x = -textBmp.width - this.screenOffset
        textBmp.y = (screen.availHeight / 2) - 140 - this.screenOffset

        let textBmpTest = new BitmapText({
            text: 'Test',
            style: {
                fill: '#fff',
                fontSize: 14,
            }
        });

        let gButton = new Graphics();
        gButton.roundRect(
            textBmp.x + -(padding / 2), // -(textBmp.width / 2 + padding / 2) + textBmp.x + textBmp.width / 2,
            textBmp.y + -(padding / 2), // -(textBmp.height / 2 + padding / 2),
            textBmp.width + padding,
            textBmp.height + padding,
            4,
        );
        gButton.fill({
            color: '#222',
            // alpha: 0,
        });
        gButton.filters = [
            new DropShadowFilter({
                blur: 2,
                color: 0x000000,
                alpha: 0.2,
                offset: { x: 0, y: 0 },
            })
        ]




        conButton.addChild(gButton);
        conButton.addChild(textBmp);
        conButton.addChild(textBmpTest);

        conButton.x = screen.availWidth / 2;


        this.gOverlay.addChild(conButton);

    };





}