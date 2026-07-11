import { SrvMain } from "./srvMain";
import { SrvNodeManager } from "./srvNodeManager";
import { SrvWorld } from "./srvWorld";

export class SrvOverlay {
    srvWorld!: SrvWorld;
    srvNodeManager!: SrvNodeManager;
    constructor(
        srvWorld: SrvWorld,
        // srvNodeManager: SrvNodeManager,
    ) {
        this.srvWorld = srvWorld;

        this.srvNodeManager = this.srvWorld.srvNodeManager;
    }

}