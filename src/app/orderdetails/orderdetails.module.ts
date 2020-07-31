import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderdetailsRoutingModule } from './orderdetails-routing.module';
import { OrderdetailsComponent } from './orderdetails.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [OrderdetailsComponent],
  imports: [
    CommonModule,
    OrderdetailsRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrderdetailsModule { }
