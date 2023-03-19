import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';//PreloadAllModules
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/main-child/profile/profile.component';
import { OrdersComponent } from './pages/main-child/orders/orders.component';
import { BookingComponent } from './pages/main-child/booking/booking.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ChangepassComponent } from './pages/main-child/changepass/changepass.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,  },
  {
    path: 'registration',
    component: RegistrationComponent,  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'prefix' },
        { path: 'profile', component: ProfileComponent },
        { path: 'orders', component: OrdersComponent },
        { path: 'partner', component: BookingComponent },
        { path: 'changepass', component: ChangepassComponent },
        {
          path: '**', redirectTo: 'profile',
        }
      ]
  },
  {
    path: '**', redirectTo: 'login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],//, {preloadingStrategy: PreloadAllModules}//RouterModule.forRoot(routes, { useHash: true }
  exports: [RouterModule]
})
export class AppRoutingModule { }
