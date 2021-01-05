import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerApplicationComponent } from './customer-application/customer-application.component';

const routes: Routes = [
  { path: 'customer-application', component: CustomerApplicationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
