  import { Component } from '@angular/core';
  import { Router } from '@angular/router';
  import Swal from 'sweetalert2';

  interface Credencial {
    nombre: string;
    contraseña: string;
  }

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent {

    constructor(public router: Router) {}

    navegar() {
      const nombre = (document.getElementById("nombre") as HTMLInputElement)?.value || '';
      const password = (document.getElementById("password") as HTMLInputElement)?.value || '';

      // Validaciones adicionales
      if (nombre.length < 2) {
        Swal.fire('Error', 'Credenciales incorrectas', 'error');
        return;
      }

      if (password.length < 8 || !/\d/.test(password)) {
        Swal.fire('Error', 'Credenciales incorrectas', 'error');
        return;
      }

      const credencialesString = localStorage.getItem('data');

      if (credencialesString) {
        const credenciales: Credencial[] = JSON.parse(credencialesString);

        const credencialEncontrada = credenciales.find(credencial =>
          credencial.nombre === nombre && credencial.contraseña === password
        );

        if (credencialEncontrada) {
          console.log('Funciona redirección a dashboard');
          // Almacena los datos del usuario en el localStorage
          localStorage.setItem('usuarioActual', JSON.stringify(credencialEncontrada));
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', 'Credenciales incorrectas, vuelve a intentarlo', 'error');
          console.log('Funciona redirección a register');
          this.navegarRegister();
        }
      }
    }

    navegarRegister() {
      this.router.navigateByUrl('/register');
    }
  }
