import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { AgolDashboardComponent } from './dashboard/agol-dashboard.component';
import { DetailFormComponent } from './dashboard/detail-form/detail-form.component';
import { OrderStatusCatComponent } from './catalogs/order-status-cat/order-status-cat.component';

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
    path: "detail/:id",
    component: DetailFormComponent
  },
  {
    path: "catalogs/order-status",
    component: OrderStatusCatComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AgolRoutingModule { }
