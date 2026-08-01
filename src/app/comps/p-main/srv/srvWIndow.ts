import { Injectable } from "@angular/core";
import { Application, Container, FederatedPointerEvent, FederatedWheelEvent, Graphics, Rectangle, Sprite, Texture, Text, TilingSprite, BitmapText } from "pixi.js";
import { ModelNode } from "../model/ModelPoint";
import { SrvNodeManager } from "./srvNodeManager";
import { SrvWorld } from "./srvWorld";
import { SrvOverlay } from "./srvOverlay";
import { BackdropBlurFilter, DropShadowFilter } from "pixi-filters";
import gsap from "gsap";

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
        let conObject = new Container();

        conObject.position.set(
            this.srvWorld.srvMain.app.screen.width / 2 - 200,
            this.srvWorld.srvMain.app.screen.height / 2 - 200,
        );

        let gObject = new Graphics();


        gObject.roundRect(
            0,
            0,
            200,
            200,
            12
        );

        gObject.fill({
            color: 0x000,
            alpha: 1,
        });


        conObject.width = gObject.width;
        conObject.height = gObject.height;
        conObject.x += gObject.width / 2;
        conObject.y += gObject.height / 2;


        conObject.addChild(gObject);

        this.spawnWindowCon(conObject);
    };




    spawnWindowCon(conObject: Container): void {

        let conWindow = new Container({
            width: this.srvWorld.srvMain.app.screen.width,
            height: this.srvWorld.srvMain.app.screen.height,
        });

        // =======================================
        // ========== BACKGROUND MASKS ===========
        // =======================================

        let gMask = new Graphics({
            width: this.srvWorld.srvMain.app.screen.width,
            height: this.srvWorld.srvMain.app.screen.height,
        });
        gMask.rect(
            0,
            0,
            this.srvWorld.srvMain.app.screen.width,
            this.srvWorld.srvMain.app.screen.height,
        );
        gMask.fill({
            color: 0x000000,
            alpha: 0,
        });
        conWindow.addChild(gMask);

        // =======================================
        // =======================================
        // =======================================


        let gCard = new Graphics();

        gCard.roundRect(
            conObject.x,
            conObject.y,
            conObject.width,
            conObject.height,
            12
        )

        gCard.fill({
            color: 0xffffff,
            alpha: 0.15,
        });

        // gCard.fill({
        //     color: 0x123,
        //     alpha: .2,
        // });

        gCard.stroke({
            color: '#fafafa',
            width: 2,
        })

        // =======================
        // ======= EFFECTS =======
        // =======================

        const blur = new BackdropBlurFilter({
            strength: 4,
            quality: 3,
        })

        const dropShadow = new DropShadowFilter({
            blur: 2,
            color: 0x000000,
            alpha: 0,
            offset: { x: 0, y: 0 },
        })


        gCard.filters = [
            blur,
            dropShadow,
        ];

        // gCard.filterArea = new Rectangle(
        //     this.srvWorld.srvMain.app.screen.width / 2 - 200,
        //     this.srvWorld.srvMain.app.screen.height / 2 - 200,
        //     gCard.width + 40,
        //     gCard.height + 40,
        // );


        conWindow.addChild(gCard);
        conWindow.addChild(conObject);

        // Initial state
        conWindow.alpha = 0;
        conWindow.y = 20;
        // conWindow.scale.set(0.85);


        this.srvOverlay.gOverlay.addChild(conWindow);

        // =============================
        // ========== ANIMATE ==========
        // =============================

        gsap.to(conWindow, {
            y: 0,
            duration: .4,
            ease: "sine",
        });

        gsap.to(conWindow, {
            alpha: 1,
            duration: 2,
            ease: "back.out(1)",
        });


        gsap.to(blur, {
            strength: 8,
            duration: 0.4,
            ease: "power2.out",
        });

        gsap.to(dropShadow, {
            alpha: 0.2,
            duration: 0.4,
            ease: "power2.out",
        });



        // ============================
        // ============================
        // ============================

        // gsap.to(conWindow.scale, {
        //     x: 1,
        //     y: 1,
        //     duration: 0.35,
        //     ease: "back.out(1.7)",
        // });

    };








}