import { Component } from '@angular/core';
import { BaseFormDirective } from '../base-form.directive';
import { TextAreaField } from '../models/textarea-field';

@Component({
    selector: 'textarea-field',
    templateUrl: './textarea.field.component.html',
    styleUrls: ['./textarea.field.component.scss']
})


export class TextAreaFieldComponent extends BaseFormDirective<TextAreaField> {
    constructor() {
        super();
    }

}