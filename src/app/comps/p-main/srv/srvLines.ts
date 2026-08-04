import { Injectable } from "@angular/core";
import { Container, FederatedPointerEvent, FederatedWheelEvent, Graphics, Rectangle, Sprite, Texture, Text, TilingSprite } from "pixi.js";
import { SrvWorld } from "./srvWorld";
import { SrvNodeManager } from "./srvNodeManager";
import { srvNodeData } from "./srvNodeData";
import { ModelLineData, ModelLinesConnection, ModelNode } from "../model/ModelPoint";
import { SrvHelper } from "./srvHelper";
import gsap from "gsap";

@Injectable({
    providedIn: 'root'
})
export class SrvLines {

    srvWorld!: SrvWorld;
    srvNodeManager!: SrvNodeManager;
    arrLinesData: Array<ModelLineData> = [];
    arrLinesGraphic: Array<Graphics> = [];
    childDragOffset: number = 29;
    lineToCursor: Graphics | null = null;

    constructor(
        srvWorld: SrvWorld,
        srvNodeManager: SrvNodeManager,
    ) {
        this.srvWorld = srvWorld;
        this.srvNodeManager = srvNodeManager;
    }



    drawLinesAll(world: Container): void {
        // this.clearLinesAll()
        // this.arrLinesData = [];
        // this.arrLinesGraphic = [];

        console.log(this.arrLinesGraphic.length);
        console.log(this.arrLinesData.length);

        this.srvNodeManager.arrConNodes.forEach(el => {
            let parentId = this.srvNodeManager.getParentId(el);
            let parentCon = parentId ? this.srvNodeManager.findConByNodeId(parentId) : null;
            if (parentCon) {
                this.drawLinesToParent(el, parentCon, world);
            }
        });

        console.log(this.arrLinesGraphic.length);
        console.log(this.arrLinesData.length);
    };



    drawLinesToParent(con: Container, parentCon: Container, world: Container): void {
        if (!parentCon) return;
        const g = new Graphics();

        g.moveTo(con.x, con.y - this.childDragOffset);
        g.lineTo(parentCon.x, parentCon.y + this.childDragOffset);
        g.stroke({
            width: 2, color: '#ddd'
        });

        (g as any).lineId = (new SrvHelper).getRandomAlphaNum(0);
        this.arrLinesData.push({
            lineId: (g as any).lineId,
            parentId: this.srvNodeManager.getNodeDataFromCon(con).id,
            childId: ((this.srvNodeManager.findConChildByNodeId((con as any).nodeData.id) as Container) as any)?.nodeData.id ?? null,
        });
        this.arrLinesGraphic.push(g);
        world.addChildAt(g, 1);
    };



    redrawLines(lineG: Graphics) {
        let lineConnection: ModelLinesConnection = this.getNodeConByLineId((lineG as any).lineId);

        let child = this.srvNodeManager.findConChildByNodeId((lineConnection.startNodeId as any).nodeData.id);

        console.log("lineConnection");
        console.log(lineConnection.startNodeId);
        console.log(lineConnection.endNodeId);

        let lineParent: Graphics | null = this.getLineGraphicByNodeId((lineConnection.startNodeId as any).nodeData.id);

        // ================================================
        // ===== THIS IS THE V1, BEFORE THE ANIMATION =====
        // ================================================

        // lineParent!.moveTo(lineConnection.startNodeId!.x, lineConnection.startNodeId!.y);
        // lineParent!.lineTo(lineConnection.endNodeId!.x, lineConnection.endNodeId!.y);
        // lineParent!.stroke({
        //     width: 2, color: '#ddd'
        // });

        // ================================================

        this.animateLine(
            lineParent!,
            lineConnection.endNodeId!.x,
            lineConnection.endNodeId!.y + this.childDragOffset,
            lineConnection.startNodeId!.x,
            lineConnection.startNodeId!.y - this.childDragOffset,
        );


        if (!child) return;
        let lineChild: Graphics | null = this.getLineGraphicByNodeId((child as any).nodeData.id);

        // ================================================
        // ===== THIS IS THE V1, BEFORE THE ANIMATION =====
        // ================================================

        // lineChild!.moveTo(lineConnection.startNodeId!.x, lineConnection.startNodeId!.y);
        // lineChild!.lineTo(child!.x, child!.y);
        // lineChild!.stroke({
        //     width: 2, color: '#ddd'
        // });

        // ================================================

        // this.animateLine(
        //     lineParent!,
        //     lineConnection.startNodeId!.x,
        //     lineConnection.startNodeId!.y + this.childDragOffset,
        //     lineConnection.endNodeId!.x,
        //     lineConnection.endNodeId!.y + this.childDragOffset
        // );
    }



    getLinesFromConId(nodeId: string): Graphics | null {
        for (const el of this.arrLinesGraphic) {
            if ((el as any).lineId == nodeId) {
                return el;
            };
        }
        return null;
    }



    getGraphicByLineId(lineId: string): Graphics | null {
        let g: Graphics;
        for (const el of this.arrLinesGraphic) {
            if ((el as any).lineId == lineId) {
                g = el;
                return g;
            };
        }
        return null;
    };



    nodeIsDragged(nodeId: string) {
        let connectedCon = this.srvNodeManager.findConnectedConByNodeId(nodeId);
        // console.log(connectedCon);
        for (let child of connectedCon) {
            let lineG = this.getLineGraphicByNodeId((child as any).nodeData.id);
            if (!lineG) continue;
            this.clearLine(lineG);
        }
    };



    clearLinesAll() {
        for (let el of this.arrLinesGraphic) {
            el.clear();
        }
        this.arrLinesGraphic = [];
    }



    nodeDoneDragged(nodeId: string) {
        let connectedCon = this.srvNodeManager.findConnectedConByNodeId(nodeId);
        for (let child of connectedCon) {
            let lineG = this.getLineGraphicByNodeId((child as any).nodeData.id);
            if (!lineG) continue;
            this.redrawLines(lineG!)
        }

        // let lineG = this.getLineGraphicByNodeId(nodeId);
        // this.redrawLines(lineG!)
    }



    clearLine(lineG: Graphics) {
        let x = this.getGraphicByLineId((lineG as any).lineId);

        // console.log('x');
        // console.log('x');
        // console.log(x);

        lineG.clear();
    };



    getLineGraphicByNodeId(nodeId: string): Graphics | null {
        let lineIdToSearch = '';
        for (const el of this.arrLinesData) {
            if ((el as any).parentId == nodeId) {
                lineIdToSearch = el.lineId;
                break;
            };
        };
        let g: Graphics;
        for (const el of this.arrLinesGraphic) {
            if ((el as any).lineId == lineIdToSearch) {
                g = el;
                return g;
            };
        };
        return null;
    };



    drawLineToCursor() {

        let actNode = this.srvNodeManager.childDraggedNode;

        if (actNode == null) return;

        let actCon = this.srvNodeManager.getConFromNodeId(actNode.id);

        let cursorPos = this.srvWorld.cursorPos;
        if (this.lineToCursor == null) {
            this.lineToCursor = new Graphics();
            this.srvWorld.world.addChildAt(this.lineToCursor, 1);
        }

        this.lineToCursor.clear();

        this.lineToCursor.moveTo(actCon?.x!, actCon?.y! + this.childDragOffset).lineTo(cursorPos.x, cursorPos.y).stroke({
            width: 2,
            color: "#ddd"
        });

    }



    getNodeConByLineId(lineId: string): ModelLinesConnection {
        let arrNodes = this.srvNodeManager.arrNodes
        let lineDataResult: ModelLineData | null = null;
        for (let el of this.arrLinesData) {
            if (el.lineId == lineId) {
                lineDataResult = el;
                break;
            }
        }
        let parent = this.srvNodeManager.findConByNodeId(lineDataResult?.parentId!);
        let child = this.srvNodeManager.findConByNodeId((parent as any).nodeData.parentId);

        let lineConnection: ModelLinesConnection = {
            startNodeId: parent,
            endNodeId: child,
        }
        return lineConnection;
    }



    getParentNodeDataByLineId(lineId: string): ModelNode | null {
        let arrNodes = this.srvNodeManager.arrNodes
        let lineDataResult: ModelLineData | null = null;
        for (let el of this.arrLinesData) {
            if (el.lineId == lineId) {
                lineDataResult = el;
                break;
            }
        }
        let parent = this.srvNodeManager.findConByNodeId(lineDataResult?.parentId!);

        return (parent as any).nodeData;
    }



    getLineGByLineId(lineId: string): ModelLineData | null {
        for (var el of this.arrLinesData) {
            if (el.lineId = lineId) return el
        }
        return null;
    }



    getConnectedLinesByLineId(lineId: string) {
        let lineData = this.getLineGByLineId(lineId);

        console.log(lineData);
    }



    private animateLine(
        graphics: Graphics,
        startX: number,
        startY: number,
        endX: number,
        endY: number,
        duration = 0.2
    ) {
        const progress = { t: 0 };

        gsap.to(progress, {
            t: 1,
            duration,
            ease: "power1.inOut",
            onUpdate: () => {

                const x = startX + (endX - startX) * progress.t;
                const y = startY + (endY - startY) * progress.t;

                graphics.clear();

                graphics
                    .moveTo(startX, startY)
                    .lineTo(x, y)
                    .stroke({
                        width: 2,
                        color: "#ddd",
                    });
            }
        });
    }











}