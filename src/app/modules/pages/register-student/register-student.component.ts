import { Component, OnInit } from '@angular/core';
import { BarraProgresoComponent } from '../../components/barra-progreso/barra-progreso.component';  
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TestVocationalService } from '../../services/test-vocational.service';  
import {  Student } from '../../../core/models/estudiante.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro-estudiantes',
  standalone: true,
  imports: [BarraProgresoComponent, FormsModule, CommonModule ],
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegistroEstudiantesComponent implements OnInit {
  currentStep: number = 1;
  availableCareers: any[] = [];  // Aquí se almacenarán las carreras obtenidas del backend

  // Datos del estudiante
  estudiante: Student = {
    name: '',
    lastname: '',
    phone: '',
    birth: '25',
    gender: 'macho',
    email: '',
    idSchool: 1,
    careersInterest: []  // Cambiado a un array para almacenar los ids de las carreras seleccionadas
  };

  constructor(
    private estudianteService: TestVocationalService,
    private toastrService: ToastrService
  ) {}

  // Cargar las carreras cuando el componente se inicializa
  ngOnInit(): void {
    this.loadCareers();
  }

  // Método para obtener las carreras desde el servicio
  loadCareers() {
    this.estudianteService.getCarers().subscribe(
      response => {
        this.availableCareers = response; 
      },
      error => {
        this.toastrService.error('Error al cargar las carreras');
      }
    );
  }

  // Avanza al siguiente paso
  goToNextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  // Retrocede al paso anterior
  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Envía el formulario final al backend
  submitForm() {
    console.log('Enviando datos del estudiante:', this.estudiante);
    this.estudianteService.registerDataStudent(this.estudiante).subscribe(
      _response => {
        this.toastrService.success('Estudiante registrado con éxito');
      },
      error => {
        this.toastrService.error('Error al registrar al estudiante');
      }
    );
  }
}
