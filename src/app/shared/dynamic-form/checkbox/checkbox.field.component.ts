import { Component } from '@angular/core';
import { BaseFormDirective } from '../base-form.directive';
import { CheckboxField } from '../models/checkbox-field';

@Component({
  selector: 'checkbox-field',
  templateUrl: './checkbox.field.component.html',
})


export class CheckboxFieldComponent extends BaseFormDirective<CheckboxField>  {

}