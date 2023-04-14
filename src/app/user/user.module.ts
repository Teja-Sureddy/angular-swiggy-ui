import { NgModule } from '@angular/core';
import { UserMenuPageComponent } from './user-menu-page/user-menu-page.component';
import { RouterModule, Routes } from '@angular/router';
import { UtilsModule } from '../utils/utils.module';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { UserReviewComponent } from './user-review/user-review.component';
import { UserOrdersPageComponent } from './user-orders-page/user-orders-page.component';
import { UserRestaurantsPageComponent } from './user-restaurants-page/user-restaurants-page.component';
import { UserCheckoutPageComponent } from './user-checkout-page/user-checkout-page.component';
import { UserOrderedItemsPageComponent } from './user-ordered-items-page/user-ordered-items-page.component';
import { UserRestaurantsComponent } from './components/user-restaurants/user-restaurants.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { UserPlaceOrderComponent } from './components/user-place-order/user-place-order.component';
import { UserCheckoutComponent } from './components/user-checkout/user-checkout.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserOrderedItemsComponent } from './components/user-ordered-items/user-ordered-items.component';


const routes: Routes = [
  {
    path: '', component: UserNavbarComponent,
    children: [
      {path:'', pathMatch:'full', redirectTo:'restaurants'},
      { path: 'restaurants', component: UserRestaurantsPageComponent },
      { path: 'menu/:restaurant-id', component: UserMenuPageComponent },
      { path: 'checkout', component: UserCheckoutPageComponent },
      { path: 'orders', component: UserOrdersPageComponent },
      { path: 'order/:order-id', component: UserOrderedItemsPageComponent }
    ]
  }
];


@NgModule({
  declarations: [
    UserMenuPageComponent,
    UserNavbarComponent,
    UserRestaurantsPageComponent,
    UserReviewComponent,
    UserOrdersPageComponent,
    UserCheckoutPageComponent,
    UserOrderedItemsPageComponent,
    UserRestaurantsComponent,
    UserMenuComponent,
    UserPlaceOrderComponent,
    UserCheckoutComponent,
    UserOrdersComponent,
    UserOrderedItemsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    UtilsModule
  ]
})
export class UserModule { }
