import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AutoModel } from '../../../models/auto.model';
import { EmailModel } from '../../../models/email.model';
import { RegistroAlquilerModel } from '../../../models/registroAlquilerModel';
import { AutosService } from '../../../services/autos.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registroalquiler',
  templateUrl: './registroalquiler.component.html',
})
export class RegistroalquilerComponent implements OnInit {

  //Declaracion de modelos
  auto = new AutoModel();
  email = new EmailModel();
  registroAuto = new RegistroAlquilerModel();

  constructor(private router: Router, private routeActivated: ActivatedRoute, private autosService: AutosService) {

  }

  ngOnInit() {

    const id = this.routeActivated.snapshot.paramMap.get('id'); //obtengo el id de la url para manajerla luego

    if (id !== 'nuevo') {

      this.autosService.getAuto(id) //Obtener la data del auto a alquilar para MOSTRARLA al usuario
        .subscribe((resp: AutoModel) => {
          this.auto = resp;
          this.auto.id = id;
        });
    }

  }

  //funciones
  createRegister(form: NgForm) {

    if (form.invalid) {
      console.log('ojo no funciona el formulario');
      return;
    }
    const idAuto = this.routeActivated.snapshot.paramMap.get('id');//Obtencion de id del auto
    const emailU = localStorage.getItem('emailData');//Obtencion del Email del user para insertar en la base de datos

    this.registroAuto.email_usuario = emailU;
    this.registroAuto.id_auto = idAuto;

    Swal.fire({
      title: 'Confirmación de Alquiler',
      text: ' Desea confirmar el alquiler?',
      type: 'info',
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true

    }).then(resp => {
      this.auto.estado = false; //Actualización del estado del auto a NO DISPONIBLE

      //se hace un update del estado del auto y una inserción del id_auto alquilado el Email del usuario que lo alquilo ademas de cuantas semanas de alquiler
      this.autosService.actualizarAuto(this.auto).subscribe();
      return this.autosService.crearRegistroAuto(this.registroAuto).subscribe();
    });
  }

  getEmail() {
    const emailU = localStorage.getItem('emailData')
    this.email.email = emailU;
    return this.email;
  }

}
