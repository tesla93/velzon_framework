import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { finalize } from 'rxjs';
import { SelectListItem } from 'src/app/shared/classes/select-list-item';
import { CkEditorField } from 'src/app/shared/dynamic-form/models/ckeditor-field';
import { Field } from 'src/app/shared/dynamic-form/models/field';
import { InputField } from 'src/app/shared/dynamic-form/models/input-field';
import { SelectField } from 'src/app/shared/dynamic-form/models/select-field';
import { FormBaseComponent } from 'src/app/shared/utils/form.base.component';
import { Order } from '../../models/order.model';
import { ReportService } from '../../report/report.service';
import { OrderService } from '../order.service';
import { ButtonItems } from 'src/app/shared/generic-buttons/classes/button-items';
import { OrderStatusService } from '../../catalogs/order-status.service';

@Component({
  selector: 'detail-form',
  templateUrl: './detail-form.component.html',
  styleUrl: './detail-form.component.scss'
})
export class DetailFormComponent extends FormBaseComponent implements OnInit {


  public Editor = ClassicEditor;
  fields!: Field<any>[];
  orderId!: number;
  actualStatusId!: number;
  statusDropdown!: SelectListItem[];
  orderForm!: UntypedFormGroup;
  selectedOrderData: Order = {} as Order
  showSpinner = false;
  airportItems: any = {};
  showForm = false;
  airportSelectItems: SelectListItem[] = [];
  override buttons = [
    <ButtonItems>{
      text: "GENERAL.COMMONBUTTONS.SAVE",
      type: "submit",
      iconClass: "ri-save-3-line label-icon align-middle fs-16",
      ngClass: "btn btn-primary btn-label",
    },
    <ButtonItems>{
      text: "GENERAL.COMMONBUTTONS.CANCEL",
      type: "button",
      ngClass: "btn btn-secondary btn-label",
      iconClass: "ri-close-line label-icon align-middle fs-16",
      clickHandler: (): void => {
        this.buttonBackClickHandler();
      }
    },
  ];

  submitted: boolean = false

  constructor(
    injector: Injector,
    private formBuilder: UntypedFormBuilder,
    public router: Router,
    private cd: ChangeDetectorRef,
    public activatedRoute: ActivatedRoute,
    public orderService: OrderService,
    public orderStatusService: OrderStatusService,
    private reportService: ReportService) {
    super(injector);
  }
  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => {
        if (parseInt(params['id'])) {
          this.orderId = parseInt(params['id']);
          this.getItemDetail();
        }
      });

    this.orderStatusService.getDropdown().then((items: SelectListItem[]) => {
      this.statusDropdown = items;
    }).catch((error) => {
    })
    this.initFields()
    this.initForm();
    this.getAirportList();
    this.setBreadCrumbItems('MENUITEMS.AGOL.DASHBOARD.TEXT', 'Order Detail');
  }

  getItemDetail() {
    this.showSpinner = true;
    this.orderService.get(this.orderId).then((response: Order) => {
      this.selectedOrderData = response;
      this.actualStatusId = +response.orderStatusId
      this.initFields();
      this.initForm();
      this.showSpinner = false;
    })
  }

  initForm(): void {
    this.orderForm = this.formBuilder.group({
      referenceId: new FormControl(this.selectedOrderData?.referenceId ?? ''),
      orderStatusId: new FormControl(this.selectedOrderData?.orderStatusId?.toString()),
      cargo: new FormControl(this.selectedOrderData?.cargo ?? ''),
      shipper: new FormControl(this.selectedOrderData?.shipper ?? ''),
      consignee: new FormControl(this.selectedOrderData?.consignee ?? ''),
      originInlandAirport: new FormControl(this.selectedOrderData?.originInlandAirport ?? ''),
      originAirport: new FormControl(this.selectedOrderData?.originAirport),
      destinationInlandAirport: new FormControl(this.selectedOrderData?.destinationInlandAirport ?? ''),
      destinationAirport: new FormControl(this.selectedOrderData?.destinationAirport),
      agentAssigned: new FormControl(this.selectedOrderData?.agentAssigned ?? ''),
      comments: new FormControl(this.selectedOrderData?.comments ?? ''),
    });
  }

  initFields() {
    this.fields = [
      new InputField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.REFERENCEID',
        label: 'MENUITEMS.AGOL.DASHBOARD.REFERENCEID',
        name: 'referenceId',
        parentClass: 'col-4 my-2',
        disabled: false,
        readonly: !!this.orderId,
        maxlength: 100,
        order: 0,
      }),
      new SelectField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.STATUS',
        label: 'MENUITEMS.AGOL.DASHBOARD.STATUS',
        name: 'orderStatusId',
        parentClass: 'col-4 my-2',
        selectListItem: this.statusDropdown,
        order: 1,
      }),
      new InputField({
        placeHolder: 'Cargo',
        label: 'Cargo',
        name: 'cargo',
        parentClass: 'col-4 my-2',
        disabled: true,
        maxlength: 100,
        order: 2,
      }),
      new InputField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.SHIPPER',
        label: 'MENUITEMS.AGOL.DASHBOARD.SHIPPER',
        name: 'shipper',
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
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.ORIGINLANDCARRIER',
        label: 'MENUITEMS.AGOL.DASHBOARD.ORIGININLANDCARRIER',
        name: 'originInlandAirport',
        parentClass: 'col-4 my-2',
        disabled: true,
        maxlength: 100,
        order: 5,
      }),
      new SelectField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.ORIGINAIRPORT',
        label: 'MENUITEMS.AGOL.DASHBOARD.ORIGINAIRPORT',
        name: 'originAirport',
        parentClass: 'col-4 my-2',
        // disabled: true,
        selectListItem: this.airportSelectItems,
        order: 6,
      }),
      new InputField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.DESTINATIONINLANDCARRIER',
        label: 'MENUITEMS.AGOL.DASHBOARD.DESTINATIONINLANDCARRIER',
        name: 'destinationInlandAirport',
        parentClass: 'col-4 my-2',
        disabled: true,
        maxlength: 100,
        order: 7,
      }),
      new SelectField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.DESTINATIONAIRPORT',
        label: 'MENUITEMS.AGOL.DASHBOARD.DESTINATIONAIRPORT',
        name: 'destinationAirport',
        parentClass: 'col-4 my-2',
        // disabled: true,
        selectListItem: this.airportSelectItems,
        order: 8,
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
    ]
  }

  getAirportList() {
    this.reportService.readJsonFromAsset()
      .pipe(
        finalize(() => {
          this.initFields();
          this.initForm();
        })
      )
      .subscribe(obj => {
        this.airportItems = Object.values(obj);
        this.airportSelectItems = this.airportItems[0].map((airportItem: any) => ({ text: `${airportItem._IATACode} - ${airportItem._Name}`, value: airportItem._IATACode }))
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.orderForm.valid) {
      // this.selectedOrderData = this.selectedOrderData ? { ...this.selectedOrderData } as Order : {} as Order
      Object.assign(this.selectedOrderData, this.orderForm.getRawValue());

      this.showSpinner = true;
      this.orderId ? this.update() : this.create()
    }
  }

  async update() {
    await this.orderService.update(this.selectedOrderData.id, this.selectedOrderData).then((response: any) => {
      this.showSpinner = false;
      if (!!response.id) {
        this.buttonBackClickHandler();
      }
    });
  }

  async create() {
    const response = await this.orderService.create(this.selectedOrderData);
    this.showSpinner = false;
  }

  changeStatusOnChild(value: string) {
    this.orderForm.controls['orderStatusId'].setValue(value);
  }



  buttonBackClickHandler() {
    this.router.navigate(['agol/dashboard']);
  }


}
