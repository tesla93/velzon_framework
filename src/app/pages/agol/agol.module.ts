import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgStepperModule } from 'angular-ng-stepper';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { NgxSliderModule } from 'ngx-slider-v2';
import { UiSwitchModule } from 'ngx-ui-switch';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgolRoutingModule } from './agol-routing.module';
import { ReportComponent } from './report/report.component';



@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbNavModule,
    NgSelectModule,
    UiSwitchModule,
    FlatpickrModule,
    ColorPickerModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxSliderModule,
    CdkStepperModule,
    NgStepperModule,
    CKEditorModule,
    DropzoneModule,
    AutocompleteLibModule,
    AgolRoutingModule,
    SharedModule
  ]
})
export class AgolModule { }