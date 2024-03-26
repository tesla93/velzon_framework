import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ListBaseComponent } from 'src/app/shared/utils/list.base.component';
import { cargoModelData } from '../models/cargo-model.data';
import { PaginationModel } from 'src/app/shared/grid/classes/pagination.model';
import { GridColumn } from 'src/app/shared/grid/classes/grid-column';
import { DisplayingMode } from 'src/app/shared/grid/enums/displaying-mode';
import { GridComponent } from 'src/app/shared/grid/grid.component';
import { Router } from '@angular/router';
import { AnalyticData } from '../models/analytic-data';

@Component({
  selector: 'agol-dashboard',
  templateUrl: './agol-dashboard.component.html',
  styleUrl: './agol-dashboard.component.scss'
})
export class AgolDashboardComponent extends ListBaseComponent<any> implements OnInit {
  @ViewChild("grid", { static: false }) grid!: GridComponent<any>;

  override columns = [
    <GridColumn>{
      field: "customerReferenceId",
      header: "MENUITEMS.AGOL.DASHBOARD.REFERENCEID",
    },
    <GridColumn>{
      field: "customerName",
      header: "MENUITEMS.AGOL.DASHBOARD.CUSTOMERNAME",
    },
    <GridColumn>{
      field: "shipper",
      // displayingMode: DisplayingMode.Avatar,
      header: "MENUITEMS.AGOL.DASHBOARD.SHIPPER",
    },
    <GridColumn>{
      field: "originAirport",
      header: "MENUITEMS.AGOL.DASHBOARD.ORIGINAIRPORT",
    },
    <GridColumn>{
      field: "consignee",
      // displayingMode: DisplayingMode.Avatar,
      header: "MENUITEMS.AGOL.DASHBOARD.CONSIGNEE",
    },
    <GridColumn>{
      field: "destinationAirport",
      header: "MENUITEMS.AGOL.DASHBOARD.DESTINATIONAIRPORT",
    },
    <GridColumn>{
      field: "currentStatusName",
      header: "MENUITEMS.AGOL.DASHBOARD.STATUS",
      displayingMode: DisplayingMode.Status,
    },
    <GridColumn>{
      field: "edit",
      header: "GENERAL.COMMONBUTTONS.ACTION",
      actionButtons: [
        {
          iconClass: 'ri-eye-fill text-warning',
          clickHandler: (id: any) => {
            // this.getFee(id)
          }
        },
        {
          iconClass: "ri-pencil-fill text-success",
          clickHandler: (id: any): void => {
            this.router.navigate(['/agol/detail/0']);
          },
        },
        {
          iconClass: 'ri-delete-bin-fill align-bottom me-2 text-danger',
          clickHandler: (id: string) => {
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

  constructor(injector: Injector, private router: Router) {
    super(injector);

  }
  ngOnInit() {
    this.getDataItems();
    this.getAnalyticData();
    this.setBreadCrumbItems('MENUITEMS.AGOL.DASHBOARD.TEXT');
  }


  getDataItems(pagination?: PaginationModel) {
    this.dataList = cargoModelData
  }

  getAnalyticData() {
    this.analyticData = { pendingOrders: 456, totalOrders: 15685, completedOrders: 988, openOrders: 5 }
    this.loadingAnalytics=false;
  }

  getBadgeClass(status: string) {
    switch (status.toUpperCase()) {
      case "ABIERTA":
      case "EN CURSO":
        return "badge bg-warning-subtle text-warning";
      case "RESUELTA":
      case "FINALIZADA":
      case "COMPLETED":
        return "badge bg-success-subtle text-success";
      default:
        return "badge bg-danger-subtle text-danger";
    }
  }



}
