import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Lista de rutas
  rutas: string[] = ['Ruta 1', 'Ruta 2', 'Ruta 3'];

  // Variable para almacenar el nombre de la nueva ruta
  nuevaRuta: string = '';

  // Variable para controlar qué formulario se muestra
  formularioVisible: 'crearRuta' | 'anadirConductor' | 'estacionNueva' | null = null;

  constructor(public router: Router) { }

  navegarLogin() {
    // Mostrar la alerta al cerrar sesión
    Swal.fire({
      title: '¡Hasta luego!',
      text: 'Has cerrado sesión, vuelve pronto.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      // Redirigir a la página de inicio de sesión después de cerrar sesión
      this.router.navigateByUrl('/');
    });
  }

  // Método para agregar una nueva ruta
  agregarRuta() {
    if (this.nuevaRuta.trim() !== '') {
      this.rutas.push(this.nuevaRuta);
      this.nuevaRuta = ''; // Limpiar el campo después de agregar la ruta
    }
  }

  // Método para mostrar el formulario correspondiente
  mostrarFormulario(formulario: 'crearRuta' | 'anadirConductor' | 'estacionNueva') {
    this.formularioVisible = formulario;
  }

  // Nueva función para ver el perfil del usuario
  verPerfil() {
    // Lee los datos del usuario desde el localStorage
    const usuarioString = localStorage.getItem('usuarioActual');
    
    if (usuarioString) {
      const usuarioActual = JSON.parse(usuarioString);
      
      // Muestra los datos del usuario
      Swal.fire({
        title: 'Perfil del Usuario',
        html: `<strong>tipo Documento:</strong> ${usuarioActual.tipoID}<br><strong>Nombre:</strong> ${usuarioActual.nombre}<br><strong>Contraseña:</strong> ${usuarioActual.contraseña}<br><strong>Nro. Documento:</strong> ${usuarioActual.ID}`,
        icon: 'info',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire('Error', 'No se encontraron datos del usuario', 'error');
    }
  }
}
