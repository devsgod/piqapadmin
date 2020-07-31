import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RestdetailsRoutingModule } from './restdetails-routing.module';
import { RestdetailsComponent } from './restdetails.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { FormModule } from 'app/forms/forms.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [RestdetailsComponent],
  imports: [
    CommonModule,
    RestdetailsRoutingModule,
    GooglePlaceModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule,
    NgxSpinnerModule,
    NgbTabsetModule,
    FormModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule
  ]
})
export class RestdetailsModule { }
