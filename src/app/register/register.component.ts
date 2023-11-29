import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Credencial {
  tipoID: string;
  ID: string;
  nombre: string;
  contraseña: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public credenciales: Credencial[] = [];

  constructor(public router: Router) {
    this.insertData();
  }

  insertData() {
    this.credenciales = [
      {
        tipoID: "CC",
        ID: "3131",
        nombre: "Fernandez",
        contraseña: "123"
      }
    ];

    localStorage.setItem('data', JSON.stringify(this.credenciales));
  }

  createUser() {
    const tipoID = (document.getElementById("tipoID") as HTMLSelectElement).value;
    const ID = (document.getElementById("ID") as HTMLInputElement).value;
    const nombre = (document.getElementById("name") as HTMLInputElement).value;
    const password = (document.getElementById("pass") as HTMLInputElement).value;

    // Validaciones adicionales
    if (ID.length < 6) {
      Swal.fire('Error', 'Número de documento debe tener al menos 6 caracteres', 'error');
      return;
    }

    if (nombre.length < 2) {
      Swal.fire('Error', 'Nombre debe tener más de 1 caracter', 'error');
      return;
    }

    if (password.length < 8 || !/\d/.test(password)) {
      Swal.fire('Error', 'Contraseña debe tener al menos 8 caracteres y contener al menos un número', 'error');
      return;
    }

    const nuevasCredenciales = {
      tipoID: tipoID,
      ID: ID,
      nombre: nombre,
      contraseña: password
    };

    this.credenciales.push(nuevasCredenciales);

    localStorage.setItem('data', JSON.stringify(this.credenciales));
    this.clearForm();
    Swal.fire({
      title: 'Éxito',
      text: 'Usuario registrado exitosamente',
      icon: 'success'
    }).then(() => {
      this.router.navigateByUrl('/');
    });
  }

  clearForm() {
    (document.getElementById("tipoID") as HTMLSelectElement).value = "";
    (document.getElementById("ID") as HTMLInputElement).value = "";
    (document.getElementById("name") as HTMLInputElement).value = "";
    (document.getElementById("pass") as HTMLInputElement).value = "";
  }

  navegarLogin() {
    this.router.navigateByUrl('/');
  }
}
