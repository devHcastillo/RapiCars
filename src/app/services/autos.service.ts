import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutoModel } from '../models/auto.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  //firebase autos url
  private URL = "https://angular-rapicars-firestore.firebaseio.com";

  constructor(private http: HttpClient) { }



  crearAuto( heroe:AutoModel){

    return this.http.post(`${ this.URL }/autos.json`,heroe)
    .pipe(
      map( (resp:any) =>{
        heroe.id = resp.name;
        return heroe;
      })
    );

  }



  actualizarAuto(auto:AutoModel){

    const autoWithOutId = {
      ...auto
    }

    delete autoWithOutId.id;

    return this.http.put(`${ this.URL}/autos/${ auto.id }.json`,autoWithOutId);

  }

  getAutosDisponible(){
    return this.http.get(`${ this.URL }/autos.json`)
    .pipe(
      map(resp => this.crearArreglo(resp) )
    );
  }

  getAutos(){
    return this.http.get(`${ this.URL }/autos.json`)
    .pipe(
      map(resp => this.crearArreglo(resp) )
    );
  }



  borrarAuto( id: string){
    return this.http.delete(`${ this.URL }/autos/${ id }.json`);
  }


  getAuto(id: string ){
  //  return this.http.get(`${ this.URL }/autos/${ id }.json`).pipe(map( this.crearArreglo ));
  return this.http.get(`${ this.URL }/autos/${ id }.json`);

  }

private crearArreglo( autosObj: object){
  const autos: AutoModel[] = [];
  if (autosObj === null) {
    return [];
  }
Object.keys(autosObj).forEach( key => {
  const auto: AutoModel = autosObj[key];
  auto.id = key;
  autos.push(auto);
});
  return autos;
}


}
