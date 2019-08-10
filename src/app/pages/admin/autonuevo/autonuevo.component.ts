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
  styleUrls: ['./autonuevo.component.css']
})
export class AutonuevoComponent implements OnInit {


auto = new AutoModel();


  constructor(private auth: AuthService,private autosService: AutosService, private router: Router,private routeActivated: ActivatedRoute) { }

  ngOnInit() {

    const id = this.routeActivated.snapshot.paramMap.get('id');
  //  const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo'){

      this.autosService.getAuto( id )
        .subscribe( (resp: AutoModel )=> {
      this.auto = resp;
      this.auto.id = id;
        });
    }
  }


    save(form: NgForm){

        if(form.invalid){
          console.log('ojo no funciona el formulario');
          return;
        }


        Swal.fire({
          title: 'Espere',
          text:'Creando Registro',
          type:'info',
          allowOutsideClick: false
        });

        Swal.showLoading();

        let  peticion: Observable<any>;

if (this.auto.id){
    peticion = this.autosService.actualizarAuto(this.auto);
}else{
      peticion = this.autosService.crearAuto(this.auto);
    }

peticion.subscribe(resp => {
  Swal.fire({

title:  ` Auto : ${ this.auto.marca } ${ this.auto.modelo }`,
text: 'Accion Correcta',
type:'success'
  });

});

    }


  salir() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
    localStorage.removeItem('isAdmin');

  }
}
