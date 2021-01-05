import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'cbs/login', pathMatch: 'full' },

  { path: 'cbs/login', component: LoginComponent },

  {
    path: 'cbs', component: LoginComponent,
    children: [
      { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
    ]
  },

  {
    path: 'cbs', component: MainLayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
    ]
  },

  {
    path: 'cbs', component: MainLayoutComponent,
    children: [
      { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
