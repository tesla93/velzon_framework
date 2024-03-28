import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { SelectListItem } from 'src/app/shared/classes/select-list-item';
import { Field } from 'src/app/shared/dynamic-form/models/field';
import { FormBaseComponent } from 'src/app/shared/utils/form.base.component';
import { cargoModelData } from '../../models/cargo-model.data';
import { InputField } from 'src/app/shared/dynamic-form/models/input-field';
import { SelectField } from 'src/app/shared/dynamic-form/models/select-field';
import { TextAreaField } from 'src/app/shared/dynamic-form/models/textarea-field';
import { orderTrackingHistory, statusData } from '../../models/status.data';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CkEditorField } from 'src/app/shared/dynamic-form/models/ckeditor-field';

@Component({
  selector: 'detail-form',
  templateUrl: './detail-form.component.html',
  styleUrl: './detail-form.component.scss'
})
export class DetailFormComponent extends FormBaseComponent implements OnInit {


  public Editor = ClassicEditor;
  fields!: Field<any>[];
  statusDropdown: SelectListItem[] = statusData;
  ordersForm!: UntypedFormGroup;
  selectedData: any
  showSpinner = false;
  orderTrackingHistoryDatas = orderTrackingHistory;

  submitted: boolean = false

  constructor(injector: Injector, private formBuilder: UntypedFormBuilder) {
    super(injector);
  }
  ngOnInit(): void {
    this.selectedData = cargoModelData[0];
    this.initForm();
    this.initFields();
    this.setBreadCrumbItems('MENUITEMS.AGOL.DASHBOARD.TEXT', 'Order Detail');
    // this.setBreadCrumbItems('MENUITEMS.AGOL.CATALOGS.TEXT', 'MENUITEMS.AGOL.CATALOGS.STATUS');	
  }

  initForm(): void {
    this.ordersForm = this.formBuilder.group({
      customerReferenceId: new FormControl(this.selectedData.customerReferenceId),
      customerName: new FormControl(this.selectedData.customerName),
      shipper: new FormControl(this.selectedData.shipper),
      originAirport: new FormControl(this.selectedData.originAirport),
      consignee: new FormControl(this.selectedData.consignee),
      destinationAirport: new FormControl(this.selectedData.destinationAirport),
      originInlandCarrier: new FormControl(this.selectedData.originInlandCarrier),
      destinationInlandCarrier: new FormControl(this.selectedData.destinationInlandCarrier),
      currentStatusId: new FormControl(this.selectedData.currentStatusId),
      agentAssigned: new FormControl(this.selectedData.agentAssigned),
      comments: new FormControl(this.selectedData.comments),
    });
  }

  initFields() {
    this.fields = [
      new InputField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.REFERENCEID',
        label: 'MENUITEMS.AGOL.DASHBOARD.REFERENCEID',
        name: 'customerReferenceId',
        parentClass: 'col-4 my-2',
        disabled: false,
        readonly: true,
        maxlength: 100,
        order: 0,
      }),
      new SelectField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.STATUS',
        label: 'MENUITEMS.AGOL.DASHBOARD.STATUS',
        name: 'currentStatusId',
        parentClass: 'col-4 my-2',
        selectListItem: this.statusDropdown,
        order: 0,
      }),
      new InputField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.CUSTOMERNAME',
        label: 'MENUITEMS.AGOL.DASHBOARD.CUSTOMERNAME',
        name: 'customerName',
        parentClass: 'col-4 my-2',
        disabled: true,
        maxlength: 100,
        order: 1,
      }),
      new InputField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.SHIPPER',
        label: 'MENUITEMS.AGOL.DASHBOARD.SHIPPER',
        name: 'shipper',
        parentClass: 'col-4 my-2',
        disabled: true,
        maxlength: 100,
        order: 2,
      }),
      new InputField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.ORIGINAIRPORT',
        label: 'MENUITEMS.AGOL.DASHBOARD.ORIGINAIRPORT',
        name: 'originAirport',
        parentClass: 'col-4 my-2',
        disabled: true,
        maxlength: 100,
        order: 3,
      }),
      new InputField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.CONSIGNEE',
        label: 'MENUITEMS.AGOL.DASHBOARD.CONSIGNEE',
        name: 'consignee',
        parentClass: 'col-4 my-2',
        disabled: true,
        maxlength: 100,
        order: 4,
      }),
      new InputField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.DESTINATIONAIRPORT',
        label: 'MENUITEMS.AGOL.DASHBOARD.DESTINATIONAIRPORT',
        name: 'destinationAirport',
        parentClass: 'col-4 my-2',
        disabled: true,
        maxlength: 100,
        order: 5,
      }),
      new InputField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.ORIGININLANDCARRIER',
        label: 'MENUITEMS.AGOL.DASHBOARD.ORIGININLANDCARRIER',
        name: 'originInlandCarrier',
        parentClass: 'col-4 my-2',
        disabled: true,
        maxlength: 100,
        order: 6,
      }),
      new InputField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.DESTINATIONINLANDCARRIER',
        label: 'MENUITEMS.AGOL.DASHBOARD.DESTINATIONINLANDCARRIER',
        name: 'destinationInlandCarrier',
        parentClass: 'col-4 my-2',
        disabled: true,
        maxlength: 100,
        order: 7,
      }),

      new InputField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.AGENTASSIGNED',
        label: 'MENUITEMS.AGOL.DASHBOARD.AGENTASSIGNED',
        name: 'agentAssigned',
        parentClass: 'col-4 my-2',
        disabled: true,
        maxlength: 100,
        order: 9,
      }),
      new CkEditorField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.COMMENTS',
        label: 'MENUITEMS.AGOL.DASHBOARD.COMMENTS',
        name: 'comments',
        parentClass: 'col-12 my-2',
        order: 10,
      }),
      // new TextAreaField({
      //   placeHolder: 'MENUITEMS.AGOL.DASHBOARD.COMMENTS',
      //   label: 'MENUITEMS.AGOL.DASHBOARD.COMMENTS',
      //   name: 'comments',
      //   rows: 5,
      //   parentClass: 'col-12 my-2',
      //   order: 10,
      // }),

    ]
  }

  onSubmit() {
    this.showSpinner = true;
    this.submitted = true;
  }


}
