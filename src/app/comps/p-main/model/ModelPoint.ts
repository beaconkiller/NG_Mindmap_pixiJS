import { Container, Graphics } from "pixi.js";

export interface ModelNode {
    parentId: string | null,
    id: string,
    title: string,
    data: Array<any>,
    w: number,
    h: number,
    x: number,
    y: number,
    tint: string,
    status: "DONE" | "NOT DONE",
    state: ModelPointState | null,
    container: Container | null,
}


export interface ModelPointState {
    isDrag: boolean,
    isHover: boolean,
    isMouseDown: boolean,
}


export interface ModelPointStyle {
    tint: string,
    border: string,
    borderW: number,
    radius: number,
}



export interface ModelLineData {
    parentId: string,
    childId: string,
    lineId: string
}



export interface ModelLinesConnection {
    startNodeId: Container | null,
    endNodeId: Container | null,
}



export interface ModelConnectedLines {
    lineData: ModelLineData,
}
