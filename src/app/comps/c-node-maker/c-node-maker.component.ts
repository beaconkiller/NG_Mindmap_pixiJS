import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-c-node-maker',
  imports: [FormsModule],
  templateUrl: './c-node-maker.component.html',
  styleUrl: './c-node-maker.component.css'
})
export class CNodeMakerComponent {
  strName: string = "";


  @Input() inp_data: any //     <------------------------ MANDATORY 
  close_pop_up!: (result: any) => void; //     <-------- MANDATORY

  constructor() { }

  save() { //                  <------------------------- MANDATORY
    this.close_pop_up({
      title: this.strName
    });
  };


  
  


}
