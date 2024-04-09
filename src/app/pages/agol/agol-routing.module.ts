import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { AgolDashboardComponent } from './dashboard/agol-dashboard.component';
import { DetailFormComponent } from './dashboard/detail-form/detail-form.component';
import { OrderStatusCatComponent } from './catalogs/order-status-cat/order-status-cat.component';
import { OrderStatusEditComponent } from './catalogs/order-status-edit/order-status-edit.component';

// Component Pages


const routes: Routes = [
  {
    path: "report",
    component: ReportComponent
  },
  {
    path: "dashboard",
    component: AgolDashboardComponent
  },
  {
    path: "order/edit/:id",
    component: DetailFormComponent
  },
  { path: "order/create", component: DetailFormComponent },
  { path: "catalogs/order-status", component: OrderStatusCatComponent },
  // { path: "catalogs/order-status/create", component: OrderStatusEditComponent },
  // { path: "catalogs/order-status/edit/:id", component: OrderStatusEditComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AgolRoutingModule { }
