import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AutoModel } from '../../../models/auto.model'
import  { AutosService } from '../../../services/autos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.component.html',

})
export class HomeadminComponent implements OnInit {

  constructor(private auth: AuthService, private autosService: AutosService, private router: Router) { }

autos:AutoModel[] = [];

  ngOnInit() {

    this.autosService.getAutos().subscribe( resp =>{
console.log(resp);
    this.autos = resp;
    });


  }

  deleteAuto(auto: AutoModel,  i:number){

    Swal.fire({
      title:'Seguro?',
      text:`Desea eliminar este registro?` ,
      type:'question',
      showConfirmButton:true,
      showCancelButton: true
    }).then(resp =>{
      if(resp.value){
        this.autos.splice(i,1);
        return this.autosService.borrarAuto(auto.id).subscribe();
    }
    });

  }


  salir() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
    localStorage.removeItem('isAdmin');
  }
}
