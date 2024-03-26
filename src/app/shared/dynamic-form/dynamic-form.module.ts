import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from './input/input.field.component';
import { SortPipe } from './sort.pipe';
import { DynamicFormComponent } from './dynamic-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxFieldComponent } from './checkbox/checkbox.field.component';
import { TextAreaFieldComponent } from './textarea/textarea.field.component';
import { SelectFieldComponent } from './select/select.field.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DynamicPipe } from './pipe/dynamic.pipe';
import { DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { AttachmentFieldComponent } from './attachment/attachment.field.component';
import { NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';
import { GenericButtonsComponent } from '../generic-buttons/generic-buttons.component';
import { NoNumbersDirective } from '../directives/no-numbers.directive';
import { NoLettersDirective } from '../directives/no-letters.directive';
import { PasswordToggleDirective } from '../directives/hide-card.directive';
import { NgxDropzoneModule } from 'ngx-dropzone';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: `${''}`,
  maxFilesize: 500,
  uploadMultiple: false,
  acceptedFiles: '*'
};

@NgModule({
  declarations: [
    InputFieldComponent, 
    CheckboxFieldComponent, 
    DynamicFormComponent, 
    SortPipe, 
    AttachmentFieldComponent,
    TextAreaFieldComponent,
    SelectFieldComponent,
    DynamicPipe,
    GenericButtonsComponent,
    NoNumbersDirective,
    NoLettersDirective,
    PasswordToggleDirective

  ],
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule, 
    TranslateModule,
    NgxDropzoneModule,
    DropzoneModule,
    NgSelectModule,
    NgxMaskDirective,

  ],
  exports: [InputFieldComponent, SelectFieldComponent, DynamicFormComponent, SortPipe, GenericButtonsComponent, DynamicPipe],
  providers: [
    provideEnvironmentNgxMask(),
    DynamicPipe, 
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG  
    }
    ]
})
export class DynamicFormModule {}