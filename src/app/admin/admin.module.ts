import { NgModule } from '@angular/core';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { UtilsModule } from '../utils/utils.module';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminUserFormComponent } from './admin-user-form/admin-user-form.component';
import { AdminRestaurantsComponent } from './admin-restaurants/admin-restaurants.component';
import { AdminRestaurantFormComponent } from './admin-restaurants-form/admin-restaurants-form.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminMenuFormComponent } from './admin-menu-form/admin-menu-form.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminOrdersFormComponent } from './admin-orders-form/admin-orders-form.component';
import { AdminOrderedItemsFormComponent } from './admin-ordered-items-form/admin-ordered-items-form.component';
import { AdminOrderedItemsComponent } from './admin-ordered-items/admin-ordered-items.component';
import { AdminReportComponent } from './admin-report/admin-report.component';


const routes: Routes = [
  {
    path: '', component: AdminNavbarComponent,
    children: [
      {path:'', pathMatch:'full', redirectTo:'users'},
      { path: 'users', component: AdminUsersComponent },
      { path: 'user-form', component: AdminUserFormComponent },
      { path: 'user-form/:id', component: AdminUserFormComponent },
      { path: 'restaurants', component: AdminRestaurantsComponent },
      { path: 'restaurant-form', component: AdminRestaurantFormComponent },
      { path: 'restaurant-form/:id', component: AdminRestaurantFormComponent },
      { path: 'menu/:restaurant-id', component: AdminMenuComponent },
      { path: 'menu-form/:restaurant-id', component: AdminMenuFormComponent },
      { path: 'menu-form/:restaurant-id/:id', component: AdminMenuFormComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'orders-form', component: AdminOrdersFormComponent },
      { path: 'orders-form/:id', component: AdminOrdersFormComponent },
      { path: 'ordereditems/:order-id', component: AdminOrderedItemsComponent },
      { path: 'ordereditems-form/:order-id', component: AdminOrderedItemsFormComponent },
      { path: 'ordereditems-form/:order-id/:id', component: AdminOrderedItemsFormComponent },
      { path: 'report', component: AdminReportComponent },
    ]
  }
];

@NgModule({
  declarations: [
    AdminMenuComponent,
    AdminUsersComponent,
    AdminUserFormComponent,
    AdminRestaurantsComponent,
    AdminRestaurantFormComponent,
    AdminNavbarComponent,
    AdminMenuFormComponent,
    AdminOrdersComponent,
    AdminOrdersFormComponent,
    AdminOrderedItemsFormComponent,
    AdminOrderedItemsComponent,
    AdminReportComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    UtilsModule
  ]
})
export class AdminModule { }
