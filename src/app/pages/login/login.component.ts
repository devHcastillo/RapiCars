import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {

    if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }

  }


  login( form: NgForm ) {

    if (  form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,// evitar que se cierre la ventana se hace click fuera
      type: 'info',//tipo de para que salga signo de admiración
      text: 'Iniciando Sesión'
    });
    Swal.showLoading();//simular un loading


    this.auth.login( this.usuario )
      .subscribe( resp => {


        console.log(resp);//ver data de respuesta
        Swal.close(); // cancelar el loading

        if ( this.recordarme ) {
          localStorage.setItem('email', this.usuario.email);
        }

        const emailResp:String = resp['email'];

        if( emailResp === "admin@admin.com" ){
          //si es el admin puedose crea una variable para que pueda ingresar a relizar el manejo de data, no pude hacer el manejo con roles con firebase ):
          localStorage.setItem('isAdmin','true');
          localStorage.setItem('emailData',resp['email'] );
          console.log('vas para el admin');
          this.router.navigateByUrl('/admin/homeadmin');

        }else{
          localStorage.setItem('emailData',resp['email'] );

          this.router.navigateByUrl('/home');

        }


      }, (err) => {

        console.log(err.error.error.message);
        Swal.fire({
          type: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      });

  }




}
