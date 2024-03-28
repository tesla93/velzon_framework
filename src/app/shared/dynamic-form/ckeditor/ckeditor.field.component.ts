import { Component } from '@angular/core';
import { BaseFormDirective } from '../base-form.directive';
import { CkEditorField } from '../models/ckeditor-field';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'ckeditor-field',
    templateUrl: './ckeditor.field.component.html',
    styleUrls: ['./ckeditor.field.component.scss']
})


export class CkEditorFieldComponent extends BaseFormDirective<CkEditorField> {
    public Editor = ClassicEditor;
    constructor() {
        super();
    }

}