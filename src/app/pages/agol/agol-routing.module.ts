import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report/report.component';

// Component Pages


const routes: Routes = [
  {
    path: "report",
    component: ReportComponent
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AgolRoutingModule { }
