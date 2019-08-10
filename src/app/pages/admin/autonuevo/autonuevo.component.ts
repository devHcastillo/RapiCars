import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AutosService } from '../../../services/autos.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AutoModel } from '../../../models/auto.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autonuevo',
  templateUrl: './autonuevo.component.html',
})
export class AutonuevoComponent implements OnInit {

  auto = new AutoModel();

  constructor(private auth: AuthService, private autosService: AutosService, private router: Router, private routeActivated: ActivatedRoute) { }

  ngOnInit() {

    const id = this.routeActivated.snapshot.paramMap.get('id');// con el routeActivated atrapar un id en la ruta para saber luego si es PUT O POST

    if (id !== 'nuevo') {//Ob
      this.autosService.getAuto(id)
        .subscribe((resp: AutoModel) => {
          this.auto = resp;
          this.auto.id = id;
        });
    }
  }

//funciones  para manejar ancciones etc...
  save(form: NgForm) {

    if (form.invalid) {return;}//revisar si el formulario no paso la validacion

    Swal.fire({
      title: 'Espere',
      text: 'Creando Registro',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();//cargar del alert
    let peticion: Observable<any>; //"observar" url y si viene con un id se hace una actulización de lo contrario sera un insert
    if (this.auto.id) {
      peticion = this.autosService.actualizarAuto(this.auto);
    } else {
      peticion = this.autosService.crearAuto(this.auto);
    }
    peticion.subscribe(resp => {//subscribe para ejecutar o disparar la acción la acciones segun el tipo de peticion que viene
      Swal.fire({
        title: ` Auto : ${this.auto.marca} ${this.auto.modelo}`,
        text: 'Accion Correcta',
        type: 'success'
      });
    });
  }

  salir() {// metodo de salir
    this.auth.logout();
    this.router.navigateByUrl('/login');
    localStorage.removeItem('isAdmin');
  }
}
