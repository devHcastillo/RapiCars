import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AutoModel } from '../../../models/auto.model';
import { EmailModel } from '../../../models/email.model';
import { RegistroAlquilerModel} from '../../../models/registroAlquilerModel';

import { AutosService } from '../../../services/autos.service';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-registroalquiler',
  templateUrl: './registroalquiler.component.html',

})
export class RegistroalquilerComponent implements OnInit {


  auto = new AutoModel();
  email = new EmailModel();
  registroAuto = new RegistroAlquilerModel();


  constructor(private router: Router,private routeActivated: ActivatedRoute, private autosService: AutosService) {

   }

  ngOnInit() {

    const id = this.routeActivated.snapshot.paramMap.get('id');

    if (id !== 'nuevo'){

      this.autosService.getAuto( id )
        .subscribe( (resp: AutoModel )=> {
      this.auto = resp;
      this.auto.id = id;
        });
    }

  }




  createRegister(form: NgForm){

      if(form.invalid){
        console.log('ojo no funciona el formulario');
        return;
      }
      const idAuto = this.routeActivated.snapshot.paramMap.get('id');
      const emailU = localStorage.getItem('emailData')

        this.registroAuto.email_usuario = emailU;
        this.registroAuto.id_auto = idAuto;
        console.log(this.registroAuto);//data ready but some error on create method on my service

      Swal.fire({
        title: 'Confirmación de Alquiler',
        text:' Desea confirmar el alquiler?',
        type:'info',
        allowOutsideClick: false,
        showConfirmButton: true,
        showCancelButton: true

      }).then( resp => {

        this.auto.estado = false;
        this.autosService.actualizarAuto(this.auto).subscribe();
      return  this.autosService.crearRegistroAuto(this.registroAuto).subscribe();


        });








  }

  getEmail(){
    const emailU = localStorage.getItem('emailData')
    this.email.email = emailU;
    return this.email;
  }

}
