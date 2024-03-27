import { Component } from '@angular/core';
import { BaseFormDirective } from '../base-form.directive';
import { InputField } from '../models/input-field';

@Component({
  selector: 'input-field',
  templateUrl: './input.field.component.html',
  styleUrls: ['./input.field.component.scss']
})


export class InputFieldComponent extends BaseFormDirective<InputField> {


  toggleFieldTextType() {
    this.field.type = this.field.type != 'password' ? 'password' : 'text'
  }
}
