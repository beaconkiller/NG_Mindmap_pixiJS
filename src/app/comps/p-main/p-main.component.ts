import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { Application, Graphics } from 'pixi.js';
import { SrvMain } from './srv/srvMain';
import { CSidebarComponent } from "./c-sidebar/c-sidebar.component";


@Component({
  selector: 'app-p-main',
  imports: [CSidebarComponent],
  templateUrl: './p-main.component.html',
  styleUrl: './p-main.component.css'
})
export class PMainComponent {

  @ViewChild('pixiCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  app!: Application;


  constructor(
    private SrvMain: SrvMain,
  ) { }


  async ngAfterViewInit() {
    console.log(this.canvas.nativeElement);
    await this.SrvMain.initialize(this.canvas.nativeElement);
  };



  drawObject() {

  }



}
