import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverdetailsComponent } from './driverdetails.component';


const routes: Routes = [
  {
    path: '',
    component: DriverdetailsComponent,
    data: {
      breadcrumb: 'Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverdetailsRoutingModule { }
