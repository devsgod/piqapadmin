import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BasicLoginComponent } from './basic-login.component';
import { BasicLoginRoutingModule } from './basic-login-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    BasicLoginRoutingModule,
    SharedModule,
    NgxSpinnerModule,
    FormsModule
  ],
  declarations: [BasicLoginComponent]
})
export class BasicLoginModule { }
