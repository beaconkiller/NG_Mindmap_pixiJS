import { Injectable, Type } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ModelComponentOvl } from "./ModelComponentOvl";


@Injectable({ providedIn: 'root' })
export class repo_dp {


    // **MARK* DP00 *MARK*
    // ------------------------------------------------------------------
    // ------------- THIS IS HOW TO SPAWN A DYNAMIC POP UP. -------------
    // ------------------------------------------------------------------
    // --   This is a dynamic-pop-up repo. That could be used to       --
    // --   spawn any component and could be filled with data and      --
    // --   return one. This involved these components / pages         --
    // --   
    // --   1. This file
    // --   2. model_component_ovl.ts
    // --   3. /c-overlay-parent
    // --   4. /c-ovl-frame
    // --
    // --   If there are errors, there's a possibility that the files  --
    // --   above are missing, not imported, or has been modified.     --
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    //
    //
    //
    //
    // **MARK* DP01 *MARK*
    // ------------------------------------------------------------------
    // ------------- THIS IS HOW TO SPAWN A DYNAMIC POP UP. -------------
    // ------------------------------------------------------------------
    // --   It returns an observable, and trigger something based on   --
    // --   the returned value. The function after trigger is dynamic. --
    // --   This is spawned inside the parent.                         --
    // ------------------------------------------------------------------
    //
    // this.rui.spawnCompFunc(CTestingCompComponent, { userId: 7 })
    //   .subscribe(result => {
    //     console.log('Dialog returned:', result);
    //
    //     if (result == 'something') {
    //       // do something
    //     }
    //   });
    //
    //
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    //
    //
    //    
    //    
    // *MARK* DP02 *MARK*
    // ------------------------------------------------------------------
    // ---------- GETTING A RETURN VALUE FROM A DYNAMIC POP UP ----------
    // ------------------------------------------------------------------
    // --   save() returns a value through an observables that has     --
    // --   been subscribed by the function caller. Otherwise just     --
    // --   return null.                                               --
    // --   This is called from the child thats spawned inside our     --
    // --   frame, or using this method. Put obj if One want to return --
    // --   something.                                                 --
    // ------------------------------------------------------------------
    //
    //
    //   @Input() inp_data:any //     <------------------------ MANDATORY 
    //   close_pop_up!: (result: any) => void; //     <-------- MANDATORY
    
    //   constructor(){}
    
    //   save() { //                  <------------------------- MANDATORY
    //     this.close_pop_up({
    //       approved: true,
    //       amount: 5000
    //     });
    //   }
    // 
    // 
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------




    ovl_count_id: number = 0;
    spawnComp$ = new BehaviorSubject<any>([])

    spawnCompFunc(comp: Type<any>, data?: any): Observable<any> {
        const result$ = new Subject<any>();
        let obj_comp: ModelComponentOvl = {
            id: new Date().getTime(),
            component: comp,
            data: data,
            data_output: result$,
        }

        this.spawnComp$.next([...this.spawnComp$.value, obj_comp]);
        this.ovl_count_id++

        return result$.asObservable();
    }

    closeComp(id: number) {
        this.spawnComp$.next(
            this.spawnComp$.value.filter((x: any) => x.id !== id)
        );
    }






}