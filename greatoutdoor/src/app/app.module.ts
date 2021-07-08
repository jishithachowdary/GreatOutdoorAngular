import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AuthInterceptor } from './service/authinterceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FashionComponent } from './fashion/fashion.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { HomeAppliancesComponent } from './home-appliances/home-appliances.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product details/product/product.component';
import { OrderComponent } from './order/order.component';
import { ReportComponent } from './report/report.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { AdminFashionComponent } from './product details/product category/admin-fashion/admin-fashion.component';
import { AdminElectronicsComponent } from './product details/product category/admin-electronics/admin-electronics.component';
import { AdminHomeAppliancesComponent } from './product details/product category/admin-home-appliances/admin-home-appliances.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    FashionComponent,
    ElectronicsComponent,
    HomeAppliancesComponent,
    WishlistComponent,
    CartComponent,
    ProfileComponent,
    UserComponent,
    ProductComponent,
    OrderComponent,
    ReportComponent,
    PageNotFoundComponent,
    RegisterComponent,
    AdminFashionComponent,
    AdminElectronicsComponent,
    AdminHomeAppliancesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }