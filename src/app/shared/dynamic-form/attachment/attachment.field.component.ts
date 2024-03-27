import { Component } from '@angular/core';
import { BaseFormDirective } from '../base-form.directive';
import { AttachmentField } from '../models/attachment-field';

@Component({
  selector: 'attachment-field',
  templateUrl: './attachment.field.component.html',
})


export class AttachmentFieldComponent extends BaseFormDirective<AttachmentField> {
  
}