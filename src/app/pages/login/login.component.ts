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

  //Declación de modelos y una variable booleana para el recordarme
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

    if (localStorage.getItem('email')) { //si existe en el localStorage un email de usuario que le dio a la casilla de recordarme se desplegara en el text de email
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }

  }

  login(form: NgForm) {

    if (form.invalid) { return; } //si en el formulario no cumple con algun campo requerido hago un return al formulario


    Swal.fire({
      allowOutsideClick: false,// evitar que se cierre la ventana se hace click fuera
      type: 'info',//tipo de para que salga signo de admiración
      text: 'Iniciando Sesión'
    });

    Swal.showLoading();//simular un loading

    this.auth.login(this.usuario)
      .subscribe(resp => {

        Swal.close(); // cancelar el loading

        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }

        const emailResp: String = resp['email'];//Se obtiene el email del usuario y es guardado en el localStorage

        if (emailResp === "admin@admin.com") {                 //"Simular" la autorizacion que cuando sea admin se redireccione
          localStorage.setItem('isAdmin', 'true');            //a una vista de admin donde puede manejar la data de autos y liberar
          localStorage.setItem('emailData', resp['email']);   //los autos del alquiler, no pude hacer el manejo con roles con firebase ):
          this.router.navigateByUrl('/admin/homeadmin');
        } else {
          localStorage.setItem('emailData', resp['email']);
          this.router.navigateByUrl('/home');
        }

      }, (err) => {
        Swal.fire({//Muestra del error de login
          type: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      });

  }




}
