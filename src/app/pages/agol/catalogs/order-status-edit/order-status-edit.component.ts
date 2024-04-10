import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBaseComponent } from 'src/app/shared/utils/form.base.component';
import { ButtonItems } from 'src/app/shared/generic-buttons/classes/button-items';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { OrderStatus } from '../../models/order-status';
import { Field } from 'src/app/shared/dynamic-form/models/field';
import { OrderStatusService } from '../order-status.service';
import { InputField } from 'src/app/shared/dynamic-form/models/input-field';
import { SelectField } from 'src/app/shared/dynamic-form/models/select-field';
import { SelectListItem } from 'src/app/shared/classes/select-list-item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { remixicons } from '../../models/remixIcon';

@Component({
  selector: 'order-status-edit',
  templateUrl: './order-status-edit.component.html',
  styleUrl: './order-status-edit.component.scss'
})
export class OrderStatusEditComponent extends FormBaseComponent implements OnInit {


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
        this.buttonBackCancel();
      }
    },
  ];

  fields!: Field<any>[];
  @Input() orderStatusId?: number;
  @Output() refreshDataItems = new EventEmitter<any>();
  orderStatusForm!: UntypedFormGroup;
  selectedOrderStatus: OrderStatus = {} as OrderStatus;
  showSpinner = false;
  isEdit: boolean = false;
  submitted: boolean = false;

  iconDropdown: SelectListItem[] = [];


  constructor(
    injector: Injector,
    private formBuilder: UntypedFormBuilder,
    public modalService: NgbModal,
    public orderStatusService: OrderStatusService,
    public activatedRoute: ActivatedRoute,
    private router: Router,

  ) {
    super(injector);

  }

  ngOnInit(): void {
    if (!!this.orderStatusId) {
      this.isEdit = true;
      this.getDataItems();
    }
    this.loadIcons();

    this.initFields();
    this.initForm();
    this.setBreadCrumbItems('MENUITEMS.AGOL.CATALOGS.TEXT', 'Order Status Edit');
  }

  getDataItems() {
    this.showSpinner = true;
    this.orderStatusService.get(this.orderStatusId ?? 0).then((response: OrderStatus) => {
      this.selectedOrderStatus = response;
      this.initFields();
      this.initForm();
      this.showSpinner = false;
    })
  }

  initForm() {
    this.orderStatusForm = this.formBuilder.group({
      sequence: new FormControl(this.selectedOrderStatus?.sequence ?? ''),
      icon: new FormControl(this.selectedOrderStatus?.icon),
      name: new FormControl(this.selectedOrderStatus?.name ?? ''),
    });

  }

  initFields() {
    this.fields = [
      new InputField({
        placeHolder: 'Sequence',
        label: 'Sequence',
        name: 'sequence',
        parentClass: 'col-4 my-2',
        type: 'number',
        maxlength: 100,
        order: 0,
      }),
      new SelectField({
        placeHolder: 'Icon',
        label: 'Icon',
        name: 'icon',
        searchable: true,
        parentClass: 'col-4 my-2',
        selectListItem: this.iconDropdown,
        order: 1,
      }),
      new InputField({
        placeHolder: 'Status Name',
        label: 'Status Name',
        name: 'name',
        parentClass: 'col-4 my-2',
        type: 'text',
        maxlength: 100,
        order: 2,
      }),
    ]

  }

  onSubmit() {
    this.submitted = true;
    if (this.orderStatusForm.valid) {
      Object.assign(this.selectedOrderStatus, this.orderStatusForm.getRawValue());

      this.showSpinner = true;
      this.orderStatusId ? this.update() : this.create()
    }
  }

  async update() {
    await this.orderStatusService.update(this.selectedOrderStatus.id, this.selectedOrderStatus).then((response: OrderStatus) => {
      this.showSpinner = false;
      if (!!response.id) {
        this.buttonBackCancel();
      }
    });


  }

  async create() {
    const response = await this.orderStatusService.create(this.selectedOrderStatus);
    this.showSpinner = false;
    if (!!response.id) {
      this.buttonBackCancel();
    }
  }


  buttonBackCancel() {
    this.orderStatusForm.reset();
    this.selectedOrderStatus = {} as OrderStatus;
    this.refreshDataItems.emit();
    this.modalService.dismissAll();
  }

  loadIcons() {
    const icons1 = JSON.parse(remixicons);
    Object.keys(icons1).forEach((key: any) => {
      if (key !== "Editor" && icons1[key]) {
        Object.keys(icons1[key]).forEach((k: any) => {
          this.iconDropdown.push({value: 'ri-'+ k + '-line', text: k.toString(), icon: 'ri-'+ k + '-line'});
          this.iconDropdown.push({value: 'ri-'+ k + '-fill', text: k.toString(), icon: 'ri-'+ k + '-fill'});
        });
      }
    });

}

}
