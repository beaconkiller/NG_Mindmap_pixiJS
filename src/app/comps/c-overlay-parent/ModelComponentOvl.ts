import { Type } from "@angular/core";

export interface ModelComponentOvl {
    id: number;
    component: Type<any>;
    data?: any;
    data_output: any;
}