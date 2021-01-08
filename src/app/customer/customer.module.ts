import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerApplicationComponent } from './customer-application/customer-application.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from './customer.service';
import { HttpService } from '../share/http.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [CustomerApplicationComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CustomerService, HttpService]
})
export class CustomerModule { }
