
import { AddbannerRoutingModule } from './addbanner-routing.module';
import { AddbannerComponent } from './addbanner.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddbannerComponent],
  imports: [
    CommonModule,
    AddbannerRoutingModule,
    SharedModule,
    NgxSpinnerModule,
    NgbTabsetModule,
    FormsModule
  ],
})
export class AddbannerModule { }
