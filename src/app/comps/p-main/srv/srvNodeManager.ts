import { Injectable } from "@angular/core";
import { Sprite, Texture, Text, BitmapText, Container, FederatedMouseEvent, Graphics, graphicsContextToSvg, Application, BlurFilter } from "pixi.js";
import { ModelNode, ModelPointState } from "../model/ModelPoint";
import { DropShadowFilter } from 'pixi-filters';
import { SrvMain } from "./srvMain";
import { gsap } from 'gsap';
import { SrvLines } from "./srvLines";
import { repo_dp } from "../../c-overlay-parent/repo.dynamicPopUp";
import { CNodeMakerComponent } from "../../c-node-maker/c-node-maker.component";

@Injectable({
    providedIn: 'root'
})
export class SrvNodeManager {

    defaultPadding: number = 40;

    arrNodes: Array<ModelNode> = [];
    arrConNodes: Array<Container> = [];

    activeNode: ModelNode | null = null;
    hoveredNode: ModelNode | null = null;
    draggedNode: ModelNode | null = null;
    childHoveredNode: ModelNode | null = null;
    childDraggedNode: ModelNode | null = null;

    srvMain!: SrvMain;
    srvLines!: SrvLines;

    constructor(
        srvMain: SrvMain,
        private repoDp: repo_dp,
    ) {
        this.srvMain = srvMain;
        console.log(this.srvMain.srvWorld);
    };

    drawNode(nodeData: ModelNode): Container {
        const nodeGroup = new Container();
        // nodeGroup.tint = '#000000';
        nodeGroup.x = nodeData.x;
        nodeGroup.y = nodeData.y;

        const titleText = new BitmapText({
            text: nodeData.title,
            style: {
                fill: '#222',
                fontSize: 14,
            }
        });
        titleText.anchor.set(0.5);

        const rect = this.drawBorderedRect(titleText, nodeData.tint, nodeData);

        nodeGroup.eventMode = 'static';
        nodeGroup.cursor = 'pointer';

        nodeGroup.on('mouseenter', this.onMouseEnter.bind(this));
        nodeGroup.on('mouseleave', this.onMouseLeave.bind(this));
        nodeGroup.on('pointerdown', this.onPointerDown.bind(this));
        nodeGroup.on('pointerup', this.onPointerUp.bind(this));
        nodeGroup.on('pointermove', this.onPointerMove.bind(this));

        // ------------------------------------
        // ---------- GIVE THE STATE ----------
        // ------------------------------------

        let pointState: ModelPointState = { isHover: false, isDrag: false, isMouseDown: false };

        (nodeGroup as any).pointState = pointState;
        (nodeGroup as any).nodeData = nodeData;


        const shadowFilter = new DropShadowFilter({
            blur: 2,
            color: 0x000000,
            alpha: 0.2,
            offset: { x: 0, y: 0 },
        });

        nodeGroup.addChild(rect);
        nodeGroup.addChild(titleText);

        // selotip 
        // solve this redraw bug later
        nodeGroup.addChild(this.drawChildDrag(rect));

        nodeGroup.filters = [shadowFilter];
        (nodeGroup as any).nodeId = nodeData.id;

        // =====================================================================
        // ========= FINALLY PUSH THE NODE TO arrNodes AND arrConNodes =========
        // =====================================================================

        this.arrNodes.push(nodeData);
        this.arrConNodes.push(nodeGroup);

        return nodeGroup;
    };




    drawChildDrag(rect: Graphics) {

        let con = new Container();

        let x = rect.x;
        let y = rect.y;

        let gDrag = new Graphics();
        gDrag.circle(x, y + 30, 8).fill({ color: "#55555540" });
        // gDrag.roundRect(
        //     x - 10,
        //     y + 20,
        //     20,
        //     20,
        //     4
        // ).fill({ color: "#fafafa" });

        // gDrag.stroke({
        //     color: "#cacaca",
        //     width: 1,
        //     join: "round",
        // });

        gDrag.filters = [
            new DropShadowFilter({
                blur: 2,
                color: 0x000000,
                alpha: 0.1,
                offset: { x: 0, y: 0 },
            }),
        ];

        con.eventMode = "static";
        con.on('mouseenter', this.onMouseEnterChild.bind(this));
        con.on('pointerdown', this.onPointerDownChild.bind(this));
        con.on('pointerup', this.onPointerUpChild.bind(this));

        // nodeGroup.on('mouseenter', this.onMouseEnter.bind(this));


        con.addChild(gDrag);
        return con;
    }




    getParentId(con: Container): string | null {
        let nodeData = this.getNodeDataFromCon(con)
        let parentId = nodeData.parentId;
        return parentId;
    }



    drawBorderedRect(titleText: BitmapText, fill: string, nodeData: ModelNode): Graphics {
        const rect = new Graphics();
        const rectW = titleText.width + this.defaultPadding;
        const rectH = titleText.height + this.defaultPadding;
        rect.roundRect(-rectW / 2, -rectH / 2, rectW, rectH, 8);

        let status = nodeData.status;
        rect.fill(status == "DONE" ? '#f8f8f8' : '#FFDBDB');
        rect.stroke({
            color: status == 'DONE' ? '#fafafa' : '#FFEDED',
            width: 2,
            join: "round",
        });

        // rect.filters = [
        //     new BlurFilter({
        //         strength: 0.5,
        //     })
        // ]

        rect.eventMode = 'static';
        rect.cursor = 'pointer';
        return rect;
    };



    redrawBorderedRect(rect: Graphics, title: BitmapText, nodeData: ModelNode): Graphics {
        const rectW = title.width + this.defaultPadding;
        const rectH = title.height + this.defaultPadding;
        rect.roundRect(-rectW / 2, -rectH / 2, rectW, rectH, 8);

        let status = nodeData.status;
        rect.fill(status == "DONE" ? '#f8f8f8' : '#FFDBDB');
        rect.stroke({
            color: status == 'DONE' ? '#fafafa' : '#FFEDED',
            width: 2,
            join: "round",
        });

        rect.eventMode = 'static';
        rect.cursor = 'pointer';
        return rect;
    };



    createNewNode(
        parentNodeId: string | null,
        cursorPos: {
            x: number,
            y: number,
        },
        strTitle: string,
    ): ModelNode {
        let nodeData: ModelNode = {
            container: null,
            data: [
                '1. Manhear',
                '2. Ngoding',
            ],
            h: 0,
            w: 0,
            x: cursorPos.x,
            y: cursorPos.y,
            id: "120398",
            parentId: parentNodeId?.trim() != "" ? parentNodeId : "",
            state: null,
            status: "NOT DONE",
            tint: "#f8f8f8",
            title: strTitle,
        };

        this.srvMain.srvWorld.world.addChild(this.drawNode(nodeData));
        return nodeData;
    }



    getTitleBmp(container: Container): BitmapText {
        return container.children[1] as BitmapText;
    };



    onMouseEnter(event: FederatedMouseEvent): void {
        const conData = this.getNodeDataFromEvent(event);
        let container = this.getConFromEvent(event);

        gsap.to(container.scale, {
            x: 1.04,
            y: 1.04,
            duration: 0.2,
            ease: 'power2.out',
        });

        this.hoveredNode = conData;
    };



    async spawnNodeMaker(event: FederatedMouseEvent) {
        let tmpChildDraggedNode = JSON.parse(JSON.stringify(this.childDraggedNode));
        let cursorPosFreeze = JSON.parse(JSON.stringify(this.srvMain.srvWorld.cursorPos));
        this.childDraggedNode = null;

        this.srvMain.srvWorld.srvLines.lineToCursor?.clear();
        this.srvMain.srvWorld.srvLines.lineToCursor = null;

        console.log(tmpChildDraggedNode);

        let res = await new Promise((resolve) => {
            this.repoDp.spawnCompFunc(CNodeMakerComponent).subscribe((val) => {
                resolve(val);
            })
        })

        console.log(res);
        let newNode = this.createNewNode(tmpChildDraggedNode.id, cursorPosFreeze, "testing asd");

        this.arrConNodes.push(this.findConByNodeId(newNode.id)!);
        this.arrNodes.push(newNode);

        let conParent: Container = this.findConByNodeId(newNode.parentId)!;
        let conChild: Container = this.findConByNodeId(newNode.id)!;

        console.log(conParent);
        console.log(conChild);
        
        this.srvMain.srvWorld.srvLines.drawLinesAll(this.srvMain.srvWorld.world);
        console.log(this.srvMain.srvWorld.world);

        // SELOTIP BUG AS FUCK

        // this.srvMain.srvWorld.srvLines.drawLinesToParent(conParent!, conChild!, this.srvMain.srvWorld.world);

        // console.log(this.srvMain.srvWorld);
    }



    onMouseEnterChild(event: FederatedMouseEvent): void {
        const conData = this.getNodeDataFromEvent(event);
        let container = this.getConFromEvent(event);


        console.log("mouseEneter Child");

        this.hoveredNode = conData;
    };



    onMouseLeave(event: FederatedMouseEvent): void {
        this.hoveredNode = null;

        let container = this.getConFromEvent(event);
        gsap.to(container.scale, {
            x: 1,
            y: 1,
            duration: 0.4,
            ease: 'bounce',
        });
    };



    onMouseLeaveChild(event: FederatedMouseEvent): void {
        this.childHoveredNode = null;
    };



    onDragMove(event: FederatedMouseEvent) {
        const conData = (event.currentTarget as any).NodeData;
        // console.log(conData);
    };



    getActiveNode() {

    };



    onPointerDown(event: FederatedMouseEvent) {
        if (this.childDraggedNode != null) return;

        let container = (event.currentTarget as Container);
        const conData = this.getNodeDataFromEvent(event);
        this.activeNode = conData;
        this.draggedNode = conData;

        this.srvMain.srvWorld.srvLines.nodeIsDragged(conData.id);
    };



    onPointerDownChild(event: FederatedMouseEvent) {
        const conData = this.getNodeDataFromCon(this.getNodeDataFromDragChildEvent(event));
        console.log("conData");
        console.log(conData);
        this.childDraggedNode = conData;
        console.log("draggedChild");
        console.log(this.childDraggedNode);
    };



    onPointerMove(event: FederatedMouseEvent): void {
        const conData = this.getNodeDataFromEvent(event);

        // console.log(this.activeNode?.id);
        // console.log(this.hoveredNode?.id);


        // let container: Container = this.findConByNodeId(conData.id)

        // if (this.draggedNode) {
        //     if (container) {
        //         container.x = this.srvMain.cursorPos.x;
        //         container.y = this.srvMain.cursorPos.y;
        //     };
        // };
    };



    getNodeDataFromCon(container: Container): ModelNode {
        return (container as any).nodeData as ModelNode;
    };



    getNodeDataFromEvent(event: FederatedMouseEvent): ModelNode {
        let container = (event.currentTarget as Container);
        return (container as any).nodeData as ModelNode;
    };



    onPointerUp(event: FederatedMouseEvent) {
        let nodeStateData = this.getNodeState(event);
        const conNodeData = (event.currentTarget as any).nodeData as ModelNode;

        let conData = (event.currentTarget as Container);
        let graphicData = conData.children[0] as Graphics;
        graphicData = this.redrawBorderedRect(graphicData, this.getTitleBmp(conData), conNodeData);

        nodeStateData.isMouseDown = false;
        nodeStateData.isDrag = false;

        // this.draggedNode = null;
        // console.log(conData);
        this.srvMain.srvWorld.srvLines.nodeDoneDragged(conNodeData.id);
    };



    onPointerUpChild(event: FederatedMouseEvent) {
        console.log("onPointerUpChild");
        let nodeStateData = this.getNodeState(event);
        const conNodeData = (event.currentTarget as any).nodeData as ModelNode;
        this.childHoveredNode = null;
        this.childDraggedNode = null;
    };



    getConFromNodeId(nodeId: string) {
        let con: Container | undefined = this.arrConNodes.find((c) => (c as any).nodeId == nodeId);
        if (!con) return null;
        return con;
    }



    getNodeState(event: FederatedMouseEvent): ModelPointState {
        return (event.currentTarget as any).pointState as ModelPointState;
    };



    getConFromEvent(event: FederatedMouseEvent): Container {
        return (event.currentTarget as any) as Container;
    };



    logThings(): void {
        console.log([this.activeNode, this.hoveredNode, this.draggedNode]);
    };



    findConByNodeId(idToSearch: string | null): Container | null {
        if (idToSearch == null) return null;
        let conResult!: Container;
        this.arrConNodes.forEach(el => {
            let nodeId = ((el as any).nodeData as ModelNode).id;
            if (nodeId == idToSearch) {
                conResult = el;
            };
        });
        return conResult;
    };



    findConChildByNodeId(nodeId: string): Container | null {
        for (let el of this.arrConNodes) {
            if ((el as any).nodeData.parentId == nodeId) {
                return el;
            }
        }
        return null
    }



    findConChildrenByNodeId(nodeId: string): Array<Container> {
        let arr: Array<Container> = [];
        for (let el of this.arrConNodes) {
            if ((el as any).nodeData.parentId == nodeId) {
                arr.push(el);
            };
        };
        return arr
    }



    findConnectedConByNodeId(nodeId: string): Array<Container> {
        let arr: Array<Container> = [];

        arr.push(this.findConByNodeId(nodeId)!)
        for (let el of this.arrConNodes) {
            if ((el as any).nodeData.parentId == nodeId) {
                arr.push(el);
            };
        };

        return arr
    }



    getNodeDataFromDragChildEvent(event: FederatedMouseEvent): Container {
        let conChild = (event.currentTarget as Container)!.parent;
        return conChild!;
    }



    clearDragged(): void {
        this.draggedNode = null;
    }
}