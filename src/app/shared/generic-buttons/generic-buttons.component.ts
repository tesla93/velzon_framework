import { Component, Input } from '@angular/core';
import { ButtonItems } from './classes/button-items';

@Component({
  selector: 'generic-buttons',
  templateUrl: './generic-buttons.component.html',
  styleUrls: ['./generic-buttons.component.scss']
})
export class GenericButtonsComponent  {

  @Input() public buttons!: ButtonItems[];
  @Input() public submitting = false;
  @Input() public positionClass = "justify-content-end";

 


}
