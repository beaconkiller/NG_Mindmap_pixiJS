import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { COvlFrameComponent } from './c-ovl-frame/c-ovl-frame.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { ModelComponentOvl } from './ModelComponentOvl';
import { repo_dp } from './repo.dynamicPopUp';


@Component({
  selector: 'app-c-overlay-parent',
  imports: [CommonModule, FormsModule],
  templateUrl: './c-overlay-parent.component.html',
  styleUrl: './c-overlay-parent.component.css',
  animations: [
    trigger('fadeInOut', [
      // Enter animation
      transition(':enter', [
        style({ opacity: 0, transform: '' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      // Exit animation
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: '' })),
      ]),
    ]),
  ],
})


export class COverlayParentComponent {
  @ViewChild('host', { read: ViewContainerRef, static: false })
  host!: ViewContainerRef;
  compRefs: ComponentRef<any>[] = [];
  show_ovl: boolean = false;


  constructor(
    private rui: repo_dp,
  ) { }

  ngOnInit() {
    this.initLoad();
    // console.log('OVERLAY CREATED');
  }


  async initLoad() {
    this.rui.spawnComp$.subscribe(stack => {
      if (this.compRefs.length == 0) {
        this.show_ovl = false;
      }

      if (stack.length > 0) this.show_ovl = true;

      setTimeout(() => {
        if (!this.host) return;
        while (this.host.length > stack.length) {
          this.host.remove(this.host.length - 1);
        }

        const comp_new = stack.slice(this.host.length);
        comp_new.forEach((el: ModelComponentOvl) => {

          // ---------------------------------------------------------------------
          // ------------------------- SPAWN FRAME FIRST --------------------------
          // ---------------------------------------------------------------------

          const ref_frame = this.host.createComponent(COvlFrameComponent);



          // ----- We use Subscribe to signal the parent that the child ( frame )
          // ----- is view ready. Otherwise this will do everything before the frame 
          // ----- creation that would lead to a fatal error.

          ref_frame.instance.is_view.subscribe((res) => {
            const ref_comp = ref_frame.instance.contentHost!.createComponent(el.component);


            // ----- Assigned the spawned comp from the repo_ui's BehaviourSubject
            // ----- to the frame

            if (el.data) {
              ref_comp.setInput('inp_data', el.data);
            }


            // ---------------------------------------------------------------------
            // ---------- CLOSING THE POP UP, GOT FROM THE COMP INSTANCE -----------
            // ---------------------------------------------------------------------

            ref_comp.instance.close_pop_up = (res: any) => {
              el.data_output.next(res);
              el.data_output.complete();

              this.rui.closeComp(el.id);
            };

            ref_frame.instance.close = () => {
              this.rui.closeComp(el.id);
            }
          });
        });
      });
    })
  };

}
