import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ListBaseComponent } from 'src/app/shared/utils/list.base.component';
import { cargoModelData } from '../models/cargo-model.data';
import { PaginationModel } from 'src/app/shared/grid/classes/pagination.model';
import { GridColumn } from 'src/app/shared/grid/classes/grid-column';
import { DisplayingMode } from 'src/app/shared/grid/enums/displaying-mode';
import { GridComponent } from 'src/app/shared/grid/grid.component';
import { Router } from '@angular/router';
import { AnalyticData } from '../models/analytic-data';
import { OrderService } from './order.service';
import { Order } from '../models/order.model';
import { IFilterCommand } from 'src/app/core/filter';
import { IPagedData } from 'src/app/core/interfaces/paged-data';

@Component({
  selector: 'agol-dashboard',
  templateUrl: './agol-dashboard.component.html',
  styleUrl: './agol-dashboard.component.scss'
})
export class AgolDashboardComponent extends ListBaseComponent<Order> implements OnInit {
  @ViewChild("grid", { static: false }) grid!: GridComponent<Order>;

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
  ]

  option = {
    startVal: 0,
    useEasing: true,
    duration: 2,
    decimalPlaces: 0,
  };

  analyticData!: AnalyticData;
  loadingAnalytics = true;

  constructor(injector: Injector, private router: Router, public orderService: OrderService) {
    super(injector);

  }
  ngOnInit() {
    this.getDataItems();
    this.getAnalyticData();
    this.setBreadCrumbItems('MENUITEMS.AGOL.DASHBOARD.TEXT');
  }


  getDataItems(pagination?: PaginationModel) {
    this.showSpinner = true;
    const page = pagination?.page ?? 1
    const pageSize = pagination?.pageSize ?? this.itemsPerPage[0]
    const sortColumn = pagination?.sortColumn ?? 'id'
    const sortOrder = pagination?.sortOrder == 'desc' ? -1 : 1
    
    this.orderService.getPage(
      <IFilterCommand>{ first: (page - 1) * pageSize, rows: pageSize, sortOrder: sortOrder, sortField: sortColumn })
      .then((response: IPagedData<Order>) => {
        console.log(response);
        this.dataList = response.items ?? [];
        this.totalRecords = response.total ?? 0;
        this.showSpinner = false;
      })
    
    
    // this.dataList = cargoModelData

  }

  getAnalyticData() {
    this.analyticData = { pendingOrders: 456, totalOrders: 15685, completedOrders: 988, openOrders: 5 }
    this.loadingAnalytics=false;
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
        if(data){
          this.getDataItems();
        }
      })
    }
  }

}
