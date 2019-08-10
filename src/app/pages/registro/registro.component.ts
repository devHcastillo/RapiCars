import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
//Declación de modelos y una variable booleana para el recordarme
  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario) //crear el nuevo usuario con el servicio de auth
      .subscribe(Resp => {

        console.log(Resp);
        Swal.close();

        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);

        }
        localStorage.setItem('emailData', Resp['email']);
        this.router.navigateByUrl('/home');

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
