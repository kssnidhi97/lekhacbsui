import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerApplicationComponent } from './customer-application/customer-application.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [CustomerApplicationComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule
  ]
})
export class CustomerModule { }
