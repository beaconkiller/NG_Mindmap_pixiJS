import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { Application, Graphics } from 'pixi.js';
import { SrvMain } from './srv/srvMain';
import { CSidebarComponent } from "./c-sidebar/c-sidebar.component";
import { COverlayParentComponent } from "../c-overlay-parent/c-overlay-parent.component";
import { repo_dp } from '../c-overlay-parent/repo.dynamicPopUp';


@Component({
  selector: 'app-p-main',
  imports: [CSidebarComponent, COverlayParentComponent],
  templateUrl: './p-main.component.html',
  styleUrl: './p-main.component.css'
})
export class PMainComponent {

  @ViewChild('pixiCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  app!: Application;
  srvMain!: SrvMain;


  constructor(
    // private SrvMain: SrvMain,
    private repoDp: repo_dp,
  ) { }


  async ngAfterViewInit() {
    console.log(this.canvas.nativeElement);
    this.srvMain = new SrvMain(this.repoDp);
    await this.srvMain.initialize(this.canvas.nativeElement);
  };



  drawObject() {

  }



}
