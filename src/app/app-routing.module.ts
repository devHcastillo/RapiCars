import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/user/home/home.component';
import { AutosComponent } from './pages/user/autos/autos.component';

import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeadminComponent } from './pages/admin/homeadmin/homeadmin.component';
import { AutonuevoComponent } from './pages/admin/autonuevo/autonuevo.component';




const routes: Routes = [
  //admin
  { path: 'admin/homeadmin', component: HomeadminComponent, canActivate: [ AuthGuard ] },
  { path: 'admin/auto/:id', component: AutonuevoComponent, canActivate: [ AuthGuard ] },

  //!admin
  { path: 'home' , component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'autos', component: AutosComponent, canActivate: [ AuthGuard ] },
  { path: 'registro', component: RegistroComponent },
  { path: 'login' , component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
