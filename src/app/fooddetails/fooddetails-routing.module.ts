import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooddetailsComponent } from './fooddetails.component';


const routes: Routes = [
  {
    path: '',
    component: FooddetailsComponent,
    data: {
      breadcrumb: 'Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FooddetailsRoutingModule { }
