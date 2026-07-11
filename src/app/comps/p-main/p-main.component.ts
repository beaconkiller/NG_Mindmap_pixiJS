import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { Application, Graphics } from 'pixi.js';
import { SrvMain } from './srv/srvMain';


@Component({
  selector: 'app-p-main',
  imports: [],
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
    await this.SrvMain.initialize(this.canvas.nativeElement);
  };



  drawObject() {

  }



}
