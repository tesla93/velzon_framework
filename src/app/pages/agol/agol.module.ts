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
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FlightFormComponent } from './report/flight-form/flight-form.component';
import { AgolDashboardComponent } from './dashboard/agol-dashboard.component';
import { DetailFormComponent } from './dashboard/detail-form/detail-form.component';
import { CountUpModule } from 'ngx-countup';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ReportComponent,
    AgolDashboardComponent,
    DetailFormComponent,
    FlightFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    CountUpModule,
    NgbNavModule,
    NgSelectModule,
    UiSwitchModule,
    FlatpickrModule,
    ColorPickerModule,
    NgxMaskDirective,
    TranslateModule,
    NgxMaskPipe,
    NgxSliderModule,
    CdkStepperModule,
    NgStepperModule,
    CKEditorModule,
    DropzoneModule,
    AutocompleteLibModule,
    AgolRoutingModule,
    FeatherModule.pick(allIcons),
    SharedModule
  ]
})
export class AgolModule { }
