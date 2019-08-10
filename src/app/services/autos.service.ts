import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutoModel } from '../models/auto.model';
import { RegistroAlquilerModel } from '../models/registroAlquilerModel';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  //firebase autos url
  private URL = "https://angular-rapicars-firestore.firebaseio.com";

  constructor(private http: HttpClient) { }



  crearAuto( auto:AutoModel){
    return this.http.post(`${ this.URL }/autos.json`,auto)
    .pipe(
      map( (resp:any) =>{
        auto.id = resp.name;
        return auto;
      })
    );
  }

  crearRegistroAuto( registro:RegistroAlquilerModel){

    return this.http.post(`${ this.URL }/registroauto.json`,registro)
    .pipe(
      map( (resp:any) =>{
        registro.id_auto = resp.name;
        return registro;
      })
    );
  }


  actualizarAuto(auto:AutoModel){

    const autoWithOutId = {
      ...auto
    }
    delete autoWithOutId.id;//elimino el id para evitar ingregarlo dentro la colección. debido a lo forma que se esta manejando
    return this.http.put(`${ this.URL}/autos/${ auto.id }.json`,autoWithOutId);

  }

  getAutosDisponible(){//Probando otros cosas
    return this.http.get(`${ this.URL }/autos.json`)
    //  return this.http.get(`${
    .pipe(
      map(resp => this.crearArreglo(resp) )
    );
  }

  getAutos(){
    return this.http.get(`${ this.URL }/autos.json`)
    .pipe(
      map(resp => this.crearArreglo(resp) )//Cuando se obtiene la informacion viene en un formato que debemos setear nosotros para poder utilizarlo pasamos a el metodo CREAR ARREGLO
    );
  }

//convertir el objeto que viene de firebase a un array o una colección
  private crearArreglo( autosObj: object){
    const autos: AutoModel[] = []; //Creo un array vacio de AutoModel
    if (autosObj === null) {//Si la respuesta de firebase que es pasada por la cabezera del metodo esta vacia(no hay datos en la base de datos) se retorna un array vacio
      return [];
    }

  Object.keys(autosObj).forEach( key => {
    const auto: AutoModel = autosObj[key];//Decimos que que la constante auto que es autoModel es igual al objeto que viene de firebase
    auto.id = key; //le asignamos el key(indice) de la poscicion a la proiedad de id del modelo
    autos.push(auto);//añadimos  los elementos
  });
    return autos; //retornamos un arreglo manejable para nosotros
  }

  borrarAuto( id: string){
    return this.http.delete(`${ this.URL }/autos/${ id }.json`);
  }

  getAuto(id: string ){
  //  return this.http.get(`${ this.URL }/autos/${ id }.json`).pipe(map( this.crearArreglo ));
  return this.http.get(`${ this.URL }/autos/${ id }.json`);

  }




}
