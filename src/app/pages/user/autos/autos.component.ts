import { Component, OnInit } from '@angular/core';
import { AutosService } from '../../../services/autos.service';
import { AutoModel } from '../../../models/auto.model';
import { Router } from '@angular/router';//Talvez te use

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
})
export class AutosComponent implements OnInit {

  constructor(private autosService: AutosService) { }
  //Declarion del modelo
  autos: AutoModel[] = [];

  ngOnInit() {
    this.autosService.getAutosDisponible().subscribe(resp => { //Data para poblar los CARD con la informacion de los autos y posibilidades de alquilar
      console.log(resp);
      this.autos = resp;
    });

  }

}
