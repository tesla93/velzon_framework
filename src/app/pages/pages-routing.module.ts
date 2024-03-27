import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages

const routes: Routes = [
    {
      path: 'agol', loadChildren: () => import('./agol/agol.module').then(m => m.AgolModule)
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
