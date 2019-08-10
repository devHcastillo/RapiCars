import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  salir() {     //Responde al boton de salir de la ventana de usuario normal
    this.auth.logout();
    this.router.navigateByUrl('/login');
    localStorage.removeItem('isAdmin');
  }
}
