import { Container, Graphics } from "pixi.js";

export interface ModelCursorPosition {
    x: number,
    y: number,
}



export interface ModelWorldMode {
    mode: 'VIEW' | 'EDIT' | 'ADD'
}