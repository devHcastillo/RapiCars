import { Component, OnInit } from '@angular/core';
import { AutosService } from '../../../services/autos.service';
import { AutoModel } from '../../../models/auto.model'

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
})
export class AutosComponent implements OnInit {

  constructor(private autosService: AutosService) { }

  autos:AutoModel[] = [];

    ngOnInit() {

      this.autosService.getAutosDisponible().subscribe( resp =>{
        console.log(resp);

      this.autos= resp;

      });

    }

}
