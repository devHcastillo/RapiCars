import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AutoModel } from '../../../models/auto.model'
import { AutosService } from '../../../services/autos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.component.html',
})

export class HomeadminComponent implements OnInit {

  constructor(private auth: AuthService, private autosService: AutosService, private router: Router) { }

  //Declaracion de modelos
  autos: AutoModel[] = [];

  ngOnInit() {
    this.autosService.getAutos().subscribe(resp => { //Obtener todas la data de autos disponibles de la base de datos para mostrarla en una tabla
      console.log(resp);
      this.autos = resp;
    });
  }

//Funciones

  deleteAuto(auto: AutoModel, i: number) {
    Swal.fire({ //Alertas con  sweetalert2 y su implemenyacion necesaria
      title: 'Seguro?',
      text: `Desea eliminar este registro?`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.autos.splice(i, 1);//Para evitar hacer un llamado a firebase luego de eliminar un registro,solo  elimino del array que se tiene segun el d
        return this.autosService.borrarAuto(auto.id).subscribe();//luego hacemos la eliminación del dato en la base de datos
      }
    });
  }

  salir() {//Metodo de salir
    this.auth.logout();
    this.router.navigateByUrl('/login');
    localStorage.removeItem('isAdmin');
  }
}
