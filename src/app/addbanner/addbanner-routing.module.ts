import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddbannerComponent } from './addbanner.component';


const routes: Routes = [
  {
    path: '',
    component: AddbannerComponent,
    data: {
      breadcrumb: 'Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddbannerRoutingModule { }
