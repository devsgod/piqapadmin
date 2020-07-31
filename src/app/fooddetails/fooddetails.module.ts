import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooddetailsRoutingModule } from './fooddetails-routing.module';
import { FooddetailsComponent } from './fooddetails.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FooddetailsComponent],
  imports: [
    CommonModule,
    FooddetailsRoutingModule,
    GooglePlaceModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule,
    NgxSpinnerModule,
    NgbTabsetModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FooddetailsModule { }
