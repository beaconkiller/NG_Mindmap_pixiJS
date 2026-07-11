import { Injectable } from "@angular/core";
import { Application, Container, FederatedPointerEvent, FederatedWheelEvent, Graphics, Rectangle, Sprite, Texture, Text, TilingSprite } from "pixi.js";
import { ModelNode } from "../model/ModelPoint";
import { SrvNodeManager } from "./srvNodeManager";

@Injectable({
    providedIn: 'root'
})
export class srvTexture {

    getBackgroundTexture(app: Application, world: Container): TilingSprite {
        const g = new Graphics();

        let tileSize = 64;
        g.rect(0, 0, tileSize, tileSize);
        g.fill({ color: '#f9f9f9', alpha: 1 });

        g.circle(tileSize / 2, tileSize / 2, 2);
        g.fill('#12312320')

        const texture: Texture = app.renderer.generateTexture(g);

        const bg = new TilingSprite({
            texture,
            width: 20000,
            height: 20000,
            x: -20000 / 2,
            y: -20000 / 2,
        });

        return bg
    }

}