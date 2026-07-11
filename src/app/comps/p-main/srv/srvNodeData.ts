import { Injectable } from "@angular/core";
import { Application, Container, FederatedPointerEvent, FederatedWheelEvent, Graphics, Rectangle, Sprite, Texture, Text, TilingSprite } from "pixi.js";
import { ModelNode } from "../model/ModelPoint";
import { SrvNodeManager } from "./srvNodeManager";

@Injectable({
    providedIn: 'root'
})
export class srvNodeData {

    getData(): Array<ModelNode> {
        let arr: Array<ModelNode> = [
            {
                parentId: null,
                id: '001',
                title: 'Finding my self a new job',
                x: 0,
                y: 0,
                h: 100,
                w: 100,
                tint: '#000000',
                data: [
                    '1. Ini test',
                    '2. Sayur',
                ],
                status: "DONE",
                state: null,
                container: null,
            },
            {
                parentId: '001',
                id: '002',
                title: 'Make a shit app',
                x: -200,
                y: 100,
                h: 100,
                w: 100,
                tint: '#000000',
                data: [
                    '1. Manhear',
                    '2. Ngoding',
                ],
                status: "DONE",
                state: null,
                container: null,
            },
            {
                parentId: '002',
                id: '002zxc',
                title: 'Fix my VPS',
                x: -300,
                y: 200,
                h: 100,
                w: 100,
                tint: '#000000',
                data: [
                    '1. Manhear',
                    '2. Ngoding',
                ],
                status: "DONE",
                state: null,
                container: null,
            },
            {
                parentId: '001',
                id: '002asxd',
                title: 'Explain some shit in my github page',
                x: 50,
                y: 100,
                h: 100,
                w: 100,
                tint: '#000000',
                data: [
                    '1. Manhear',
                    '2. Ngoding',
                ],
                status: "DONE",
                state: null,
                container: null,
            },
            {
                parentId: '002',
                id: '003',
                title: 'Define what kind of shit im gonna make ',
                x: 0,
                y: 200,
                h: 100,
                w: 100,
                tint: '#000000',
                data: [
                    '1. Manhear',
                    '2. Ngoding',
                ],
                status: "DONE",
                state: null,
                container: null,
            },
            {
                parentId: '003',
                id: '004',
                title: 'Testing',
                x: 50,
                y: 300,
                h: 100,
                w: 100,
                tint: '#000000',
                data: [
                    '1. Manhear',
                    '2. Ngoding',
                ],
                status: "DONE",
                state: null,
                container: null,
            },
            {
                parentId: '003',
                id: '005',
                title: 'Testing Tree',
                x: -100,
                y: 300,
                h: 100,
                w: 100,
                tint: '#000000',
                data: [
                    '1. Manhear',
                    '2. Ngoding',
                ],
                status: "NOT DONE",
                state: null,
                container: null,
            },
        ];
        return arr;
    };


}