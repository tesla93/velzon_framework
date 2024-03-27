import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBaseComponent } from 'src/app/shared/utils/list.base.component';
import { PaginationModel } from 'src/app/shared/grid/classes/pagination.model';
import { statusData } from '../../models/status.data';
import { GridColumn } from 'src/app/shared/grid/classes/grid-column';
import { DisplayingMode } from 'src/app/shared/grid/enums/displaying-mode';
import { Router } from '@angular/router';
import { GridComponent } from 'src/app/shared/grid/grid.component';

@Component({
  selector: 'order-status-cat',
  templateUrl: './order-status-cat.component.html',
  styleUrl: './order-status-cat.component.scss'
})
export class OrderStatusCatComponent extends ListBaseComponent<any> implements OnInit {

  @ViewChild("grid", { static: false }) grid!: GridComponent<any>;


  override columns = [
    <GridColumn>{
      field: "value",
      header: "Id",
    },
    <GridColumn>{
      field: "order",
      header: "MENUITEMS.AGOL.CATALOGS.ORDER",
    },
    <GridColumn>{
      field: "text",
      header: "MENUITEMS.AGOL.CATALOGS.STATUSNAME",
    },
    <GridColumn>{
      field: "edit",
      header: "GENERAL.COMMONBUTTONS.ACTION",
      actionButtons: [
        
        {
          iconClass: "ri-pencil-fill text-success",
          clickHandler: (id: any): void => {
            this.router.navigate(['/catalog/order-status/detail/0']);
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
constructor(injector: Injector, private router: Router) {
  super(injector);
  
}

  ngOnInit(): void {
    this.getDataItems();
  }

  getDataItems(pagination?: PaginationModel) {
    this.dataList = statusData
  }

}
