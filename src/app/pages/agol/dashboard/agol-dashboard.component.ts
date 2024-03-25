import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { PaginationModel } from 'generic-table-form/src/shared/grid/classes/pagination.model';
import { GridComponent } from 'generic-table-form/src/shared/grid/grid.component';	
import { ListBaseComponent } from 'src/app/shared/utils/list.base.component';
import { cargoModelData } from '../models/cargo-model.data';
import { GridColumn } from 'generic-table-form/src/shared/grid/classes/grid-column';
import { DisplayingMode } from 'generic-table-form/src/shared/grid/enums/displaying-mode';

@Component({
  selector: 'agol-dashboard',
  templateUrl: './agol-dashboard.component.html',
  styleUrl: './agol-dashboard.component.scss'
})
export class AgolDashboardComponent  extends ListBaseComponent<any> implements OnInit  {
  // @ViewChild("grid", { static: false }) grid!: GridComponent<any>; 

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
      field: "currentStatusName",
      header: "MENUITEMS.AGOL.DASHBOARD.STATUS",
      displayingMode: DisplayingMode.Status,
    },
    <GridColumn>{
      field: "edit",
      header: "GENERAL.COMMONBUTTONS.ACTION",
      actionButtons: [{
        iconClass: "bx bx-edit text-info fs-18",
        clickHandler: (id: any): void => {
          // this.openWriteModal();
        },
      }],
      displayingMode: DisplayingMode.Action,

    },
  ]
 
  constructor(injector: Injector) {
    super(injector);
    
  }
  ngOnInit() {
    this.getDataItems();
  }


  getDataItems(pagination?: PaginationModel){
    this.dataList = cargoModelData
  }





}
