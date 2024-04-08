import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBaseComponent } from 'src/app/shared/utils/list.base.component';
import { PaginationModel } from 'src/app/shared/grid/classes/pagination.model';
import { statusData } from '../../models/status.data';
import { GridColumn } from 'src/app/shared/grid/classes/grid-column';
import { DisplayingMode } from 'src/app/shared/grid/enums/displaying-mode';
import { Router } from '@angular/router';
import { GridComponent } from 'src/app/shared/grid/grid.component';
import { OrderStatusService } from './order-status.service';
import { IFilterCommand } from 'src/app/core/filter';
import { IPagedData } from 'src/app/core/interfaces/paged-data';
import { OrderStatus } from '../../models/order-status';
import Swal from 'sweetalert2';

@Component({
  selector: 'order-status-cat',
  templateUrl: './order-status-cat.component.html',
  styleUrl: './order-status-cat.component.scss'
})
export class OrderStatusCatComponent extends ListBaseComponent<OrderStatus> implements OnInit {

  @ViewChild("grid", { static: false }) grid!: GridComponent<OrderStatus>;


  override columns = [
    <GridColumn>{
      field: "id",
      header: "Id",
    },
    <GridColumn>{
      field: "sequence",
      header: "MENUITEMS.AGOL.CATALOGS.ORDER",
    },
    <GridColumn>{
      field: "icon",
      style: { 'width': '8%' },
      displayingMode: DisplayingMode.Icon,
      header: "MENUITEMS.AGOL.CATALOGS.ICON",
    },
    <GridColumn>{
      field: "name",
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
  constructor(injector: Injector, private router: Router, private orderStatusService: OrderStatusService) {
    super(injector);

  }

  ngOnInit(): void {
    this.getDataItems();
    this.setBreadCrumbItems('MENUITEMS.AGOL.CATALOGS.TEXT', 'MENUITEMS.AGOL.CATALOGS.STATUS');
  }

  getDataItems(pagination?: PaginationModel) {
    this.showSpinner = true;
    const page = pagination?.page ?? 1
    const pageSize = pagination?.pageSize ?? this.itemsPerPage[0]
    const sortColumn = pagination?.sortColumn ?? 'id'
    const sortOrder = pagination?.sortOrder == 'desc' ? -1 : 1

    this.orderStatusService.getPage(
      <IFilterCommand>{ first: (page - 1) * pageSize, rows: pageSize, sortOrder: sortOrder, sortField: sortColumn })
      .then((response: IPagedData<OrderStatus>) => {
        this.dataList = response.items ?? [];
        this.totalRecords = response.total ?? 0;
        this.showSpinner = false;
      })
  }

  async deleteData(key: any) {
    if (key) {
      this.orderStatusService.delete(key).then((data: any) => {
        console.log(data)
        if(data){
          this.getDataItems();
        }
      })
    }
  }
}
