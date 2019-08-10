import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1'; //URL general
  private API_KEY = 'AIzaSyBNQojZ0qnx4GmFeN4Xk7scKJJ4BtcpMxc'; //Mi API_KEY
  userToken: string;
  is_admin: string;

  constructor( private http: HttpClient ) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');//matar el token
  }

  login( usuario: UsuarioModel ) {
    const authData = {
      ...usuario,
      returnSecureToken: true};

    return this.http.post(
      `${ this.url }/accounts:signInWithPassword?key=${ this.API_KEY }`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );

  }

  nuevoUsuario( usuario: UsuarioModel ) {
    /*
    nombre: usuario.nombre;
    cedula: usuario.cedula;
    email: usuario.email;
    returnSecureToken: true
    */
    const authData = {
      ...usuario,//obtener el objeto completo
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }/accounts:signUp?key=${ this.API_KEY }`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );

  }

  isAdmin(){
     this.is_admin =  localStorage.getItem('isAdmin');
    if( this.is_admin === 'true' ){
      console.log('true prueba');
      return true;
    }
      console.log('false prueba');
    return false;
  }

  leerToken() {
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  private guardarToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );//tiempo de vida del token

    localStorage.setItem('expira', hoy.getTime().toString() );
  }

  estaAutenticado(): boolean {// Verificar si el token esta activo
    if ( this.userToken.length < 2 ) {
      return false;
    }
    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }

  }


}
