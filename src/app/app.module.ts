import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { ProfileComponent } from './pages/main-child/profile/profile.component';
import { OrdersComponent } from './pages/main-child/orders/orders.component';
import { BookingComponent } from './pages/main-child/booking/booking.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { GlobalService } from './global.service';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ChangepassComponent } from './pages/main-child/changepass/changepass.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ProfileComponent,
    OrdersComponent,
    BookingComponent,
    RegistrationComponent,
    ChangepassComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'},GlobalService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
