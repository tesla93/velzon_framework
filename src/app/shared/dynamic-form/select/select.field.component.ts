import { Component } from '@angular/core';
import { BaseFormDirective } from '../base-form.directive';
import { SelectField } from '../models/select-field';

@Component({
    selector: 'select-field',
    templateUrl: './select.field.component.html',
    styleUrls: ['./select.field.component.scss']

})


export class SelectFieldComponent extends BaseFormDirective<SelectField> {

}
