import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ir-sesion',
  templateUrl: './ir-sesion.component.html',
  styleUrls: ['./ir-sesion.component.scss']
})
export class IrSesionComponent {
  constructor(
    private router: Router
  ) {

  }
  goToLogin(){
    this.router.navigate(['/login']);
  }
}
