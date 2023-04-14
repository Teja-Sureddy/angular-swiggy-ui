import { NgModule } from '@angular/core';
import { ManagerOrderedItemsComponent } from './manager-ordered-items/manager-ordered-items.component';
import { RouterModule, Routes } from '@angular/router';
import { UtilsModule } from '../utils/utils.module';
import { ManagerMenuFormComponent } from './manager-menu-form/manager-menu-form.component';
import { ManagerNavbarComponent } from './manager-navbar/manager-navbar.component';
import { ManagerOrdersComponent } from './manager-orders/manager-orders.component';
import { ManagerRestaurantComponent } from './manager-restaurant/manager-restaurant.component';
import { ManagerRestaurantFormComponent } from './manager-restaurant-form/manager-restaurant-form.component';


const routes: Routes = [
  {
    path: '', component: ManagerNavbarComponent,
    children: [
      {path:'', pathMatch:'full', redirectTo:'restaurant'},
      { path: 'restaurant', component: ManagerRestaurantComponent },
      { path: 'restaurant-form', component: ManagerRestaurantFormComponent },
      { path: 'menu-form', component: ManagerMenuFormComponent },
      { path: 'menu-form/:id', component: ManagerMenuFormComponent },
      { path: 'orders', component: ManagerOrdersComponent },
      { path: 'ordereditems/:order-id', component: ManagerOrderedItemsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ManagerOrderedItemsComponent,
    ManagerRestaurantComponent,
    ManagerRestaurantFormComponent,
    ManagerMenuFormComponent,
    ManagerNavbarComponent,
    ManagerOrdersComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    UtilsModule
  ]
})
export class ManagerModule { }
