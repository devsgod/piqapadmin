import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddcouponRoutingModule } from './addcoupon-routing.module';
import { AddcouponComponent } from './addcoupon.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AddcouponComponent],
  imports: [
    CommonModule,
    AddcouponRoutingModule,
    NgMultiSelectDropDownModule,
    SharedModule,
    NgxSpinnerModule,
    NgbTabsetModule,
    NgSelectModule,
    FormsModule
  ],  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddcouponModule { }
