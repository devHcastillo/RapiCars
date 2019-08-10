import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule } from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { HomeComponent } from './pages/user/home/home.component';
import { AutosComponent } from './pages/user/autos/autos.component';
import { HomeadminComponent } from './pages/admin/homeadmin/homeadmin.component';
import { AutonuevoComponent } from './pages/admin/autonuevo/autonuevo.component';
import { RegistroalquilerComponent } from './pages/user/registroalquiler/registroalquiler.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    AutosComponent,

    NavbarComponent,
    HomeadminComponent,
    AutonuevoComponent,
    RegistroalquilerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
