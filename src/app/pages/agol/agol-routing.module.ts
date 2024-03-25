import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { AgolDashboardComponent } from './dashboard/agol-dashboard.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AgolRoutingModule { }
