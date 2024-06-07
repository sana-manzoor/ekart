import { NgModule, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { ViewComponent } from './view/view.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'log',component:LoginComponent},
  {path:'reg',component:RegComponent},
  {path:'view/:id',component:ViewComponent},
  {path:'wish',canActivate:[authGuard],component:WishlistComponent},
  {path:'cart',canActivate:[authGuard],component:CartComponent},
  {path:'checkout',canActivate:[authGuard],component:CheckoutComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
