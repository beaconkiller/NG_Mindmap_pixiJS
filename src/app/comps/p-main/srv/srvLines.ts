import { Injectable } from "@angular/core";
import { Container, FederatedPointerEvent, FederatedWheelEvent, Graphics, Rectangle, Sprite, Texture, Text, TilingSprite } from "pixi.js";
import { SrvWorld } from "./srvWorld";
import { SrvNodeManager } from "./srvNodeManager";
import { srvNodeData } from "./srvNodeData";
import { ModelLineData, ModelLinesConnection, ModelNode } from "../model/ModelPoint";
import { SrvHelper } from "./srvHelper";

@Injectable({
    providedIn: 'root'
})
export class SrvLines {

    srvWorld!: SrvWorld;
    srvNodeManager!: SrvNodeManager;
    arrLinesData: Array<ModelLineData> = [];
    arrLinesGraphic: Array<Graphics> = [];

    constructor(
        srvWorld: SrvWorld,
        srvNodeManager: SrvNodeManager,
    ) {
        this.srvWorld = srvWorld;
        this.srvNodeManager = srvNodeManager;
    }



    drawLinesAll(world: Container): void {
        this.srvNodeManager.arrConNodes.forEach(el => {
            let parentId = this.srvNodeManager.getParentId(el);
            let parentCon = parentId ? this.srvNodeManager.findConByNodeId(parentId) : null;
            if (parentCon) {
                this.drawLinesToParent(el, parentCon, world);
            }
        });
    };



    drawLinesToParent(con: Container, parentCon: Container, world: Container): void {
        if (!parentCon) return;
        const g = new Graphics();

        g.moveTo(con.x, con.y);
        g.lineTo(parentCon.x, parentCon.y);
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

        console.log(lineConnection);


        let lineParent: Graphics | null = this.getLineGraphicByNodeId((lineConnection.startNodeId as any).nodeData.id);

        lineParent!.moveTo(lineConnection.startNodeId!.x, lineConnection.startNodeId!.y);
        lineParent!.lineTo(lineConnection.endNodeId!.x, lineConnection.endNodeId!.y);
        lineParent!.stroke({
            width: 2, color: '#ddd'
        });

        if (!child) return;
        let lineChild: Graphics | null = this.getLineGraphicByNodeId((child as any).nodeData.id);

        lineChild!.moveTo(lineConnection.startNodeId!.x, lineConnection.startNodeId!.y);
        lineChild!.lineTo(child!.x, child!.y);
        lineChild!.stroke({
            width: 2, color: '#ddd'
        });

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
        console.log(connectedCon);
        for (let child of connectedCon) {
            let lineG = this.getLineGraphicByNodeId((child as any).nodeData.id);
            if (!lineG) continue;
            this.clearLine(lineG);
        }
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











}