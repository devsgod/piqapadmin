import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddcouponComponent } from './addcoupon.component';


const routes: Routes = [
  {
    path: '',
    component: AddcouponComponent,
    data: {
      breadcrumb: 'Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddcouponRoutingModule { }
