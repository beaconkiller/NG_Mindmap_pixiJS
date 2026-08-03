import { Component, EventEmitter, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NgIconComponent } from "@ng-icons/core";

@Component({
  selector: 'app-c-ovl-frame',
  imports: [NgIconComponent],
  templateUrl: './c-ovl-frame.component.html',
  styleUrl: './c-ovl-frame.component.css'
})
export class COvlFrameComponent {
  @ViewChild('contentHost', { read: ViewContainerRef, static: false })
  contentHost!: ViewContainerRef;
  is_view = new Subject
  @Output() out_close = new EventEmitter();

  ngAfterViewInit() {
    this.is_view.next('test');
    this.is_view.complete();
  }

  close!: () => void;
}
