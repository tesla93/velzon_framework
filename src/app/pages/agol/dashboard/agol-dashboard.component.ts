import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IFilterCommand, IFilterInfoBase, NumberFilter } from 'src/app/core/filter';
import { IPagedData } from 'src/app/core/interfaces/paged-data';
import { SelectListItem } from 'src/app/shared/classes/select-list-item';
import { Field } from 'src/app/shared/dynamic-form/models/field';
import { SelectField } from 'src/app/shared/dynamic-form/models/select-field';
import { ButtonItems } from 'src/app/shared/generic-buttons/classes/button-items';
import { GridColumn } from 'src/app/shared/grid/classes/grid-column';
import { PaginationModel } from 'src/app/shared/grid/classes/pagination.model';
import { DisplayingMode } from 'src/app/shared/grid/enums/displaying-mode';
import { GridComponent } from 'src/app/shared/grid/grid.component';
import { ListBaseComponent } from 'src/app/shared/utils/list.base.component';
import { OrderStatusService } from '../catalogs/order-status.service';
import { AnalyticData } from '../models/analytic-data';
import { Order } from '../models/order.model';
import { OrderService } from './order.service';

@Component({
  selector: 'agol-dashboard',
  templateUrl: './agol-dashboard.component.html',
  styleUrl: './agol-dashboard.component.scss'
})
export class AgolDashboardComponent extends ListBaseComponent<Order> implements OnInit {
  @ViewChild("grid", { static: false }) grid!: GridComponent<Order>;

  requestStatus!: number;
  filterForm!: FormGroup;
  filterInfoBase: IFilterInfoBase[] = [] as IFilterInfoBase[];
  fields!: Field<any>[];
  override columns = [
    <GridColumn>{
      field: "referenceId",
      header: "MENUITEMS.AGOL.DASHBOARD.REFERENCEID",
    },
    <GridColumn>{
      field: "shipper",
      // displayingMode: DisplayingMode.Avatar,
      header: "MENUITEMS.AGOL.DASHBOARD.SHIPPER",
    },
    <GridColumn>{
      field: "agentAssigned",
      // displayingMode: DisplayingMode.Avatar,
      header: "Agent Assigned",
    },
    // <GridColumn>{
    //   field: "customerName",
    //   header: "MENUITEMS.AGOL.DASHBOARD.CUSTOMERNAME",
    // },
    <GridColumn>{
      field: "cargo",
      // displayingMode: DisplayingMode.Avatar,
      header: "Cargo",
    },
    <GridColumn>{
      field: "consignee",
      // displayingMode: DisplayingMode.Avatar,
      header: "MENUITEMS.AGOL.DASHBOARD.CONSIGNEE",
    },
    <GridColumn>{
      field: "originAirport",
      header: "MENUITEMS.AGOL.DASHBOARD.ORIGINAIRPORT",
    },

    <GridColumn>{
      field: "destinationAirport",
      header: "MENUITEMS.AGOL.DASHBOARD.DESTINATIONAIRPORT",
    },
    <GridColumn>{
      field: "orderStatusName",
      header: "MENUITEMS.AGOL.DASHBOARD.STATUS",
      displayingMode: DisplayingMode.Status,
    },
    <GridColumn>{
      field: "edit",
      header: "GENERAL.COMMONBUTTONS.ACTION",
      actionButtons: [
        {
          iconClass: 'ri-eye-fill text-secondary',
          clickHandler: (id: any) => {
            // this.getFee(id)
          }
        },
        {
          iconClass: "ri-pencil-fill text-success",
          clickHandler: (id: any): void => {
            this.router.navigate([`/agol/order/edit/${id}`]);
          },
        },
        {
          iconClass: 'ri-delete-bin-fill align-bottom me-2 text-danger',
          clickHandler: (id: string) => {
            console.log(id)
            this.grid.confirmDelete(id);
          }
        }
      ],
      displayingMode: DisplayingMode.Action,

    },
  ];

  public buttons: ButtonItems[] = [
    <ButtonItems>{
      text: "GENERAL.FILTER.SEARCH",
      type: "button",
      iconClass: "bx bx-search-alt label-icon align-middle fs-16",
      ngClass: "btn btn-primary btn-label",
      clickHandler: (): void => {
        this.getDataItems();
      }
    },
  ];

  statusDropdown: SelectListItem[] = [];

  option = {
    startVal: 0,
    useEasing: true,
    duration: 2,
    decimalPlaces: 0,
  };

  analyticData!: AnalyticData;
  loadingAnalytics = true;

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private router: Router,
    public orderStatusService: OrderStatusService,
    public orderService: OrderService) {

    super(injector);

  }
  ngOnInit() {
    this.getDataItems();
    this.getStatusDropdown();
    this.setBreadCrumbItems('MENUITEMS.AGOL.DASHBOARD.TEXT');
  }


  getDataItems(pagination?: PaginationModel) {
    this.showSpinner = true;
    const page = pagination?.page ?? 1
    const pageSize = pagination?.pageSize ?? this.itemsPerPage[0]
    const sortColumn = pagination?.sortColumn ?? 'id'
    const sortOrder = pagination?.sortOrder == 'desc' ? -1 : 1
    this.orderService.getPage(<IFilterCommand>{ first: (page - 1) * pageSize, rows: pageSize, sortOrder: sortOrder, sortField: sortColumn, filters: this.filterInfoBase})
      .then((response: IPagedData<Order>) => {
        this.dataList = response.items ?? [];
        this.totalRecords = response.total ?? 0;
        this.showSpinner = false;
      })
  }

  initFilterForms() {
    this.filterForm = this.fb.group({
      statusFilter: new FormControl()
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.manageFilters();
    })
  }

  initFilterFields() {
    this.fields = [
      new SelectField({
        placeHolder: 'MENUITEMS.AGOL.DASHBOARD.STATUS',
        label: 'MENUITEMS.AGOL.DASHBOARD.STATUS',
        name: 'statusFilter',
        multiple: false,
        clearable: true,
        searchable: true,
        parentClass: 'col-md-3 col-sm-6 my-1',
        selectListItem: this.statusDropdown,
        order: 0,
      }),
    ];
  }


  manageFilters() {
      console.log(this.filterForm.get('statusFilter')?.value)
      this.filterInfoBase=[];
      if(!!this.filterForm.get('statusFilter')?.value){

        this.filterInfoBase.push(
          new NumberFilter("orderStatusId", this.filterForm.get('statusFilter')?.value ?? 0)
        )
      }
      this.getDataItems();

  }


  getStatusDropdown() {
    this.orderStatusService.getDropdown().then((items: SelectListItem[]) => {
      this.statusDropdown = items.map(i => ({ value: i.value, text: i.text }));
    }).finally(() => {
      this.initFilterFields();
      this.initFilterForms();
    })
  }

  getBadgeClass(status: string) {
    switch (status?.toUpperCase()) {
      case "DISPATCHED FOR PICKUPS":
      case "EN CURSO":
        return "badge bg-warning-subtle text-warning";
      case "RESUELTA":
      case "CARGO IN AIR TRANSIT":
      case "COMPLETED":
        return "badge bg-success-subtle text-success";
      default:
        return "badge bg-danger-subtle text-danger";
    }
  }

  async deleteData(key: any) {
    if (key) {
      this.orderService.delete(key).then((data: any) => {
        console.log(data)
        if (data) {
          this.getDataItems();
        }
      })
    }
  }

}
