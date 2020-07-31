import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverdetailsRoutingModule } from './driverdetails-routing.module';
import { DriverdetailsComponent } from './driverdetails.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DriverdetailsComponent],
  imports: [
    CommonModule,
    DriverdetailsRoutingModule,
    SharedModule,
    NgxSpinnerModule,
    NgbTabsetModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DriverdetailsModule { }
