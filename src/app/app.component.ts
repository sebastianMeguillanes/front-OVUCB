import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NavbarComponent } from './modules/components/navbar/navbar.component';
import { FormsModule, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InscripcionService } from './modules/services/inscripcion.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    AngularSvgIconModule,
    NavbarComponent,
    RouterLink,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  openTab = 1;
  title = 'frontend_sceii';
  isModalVisible: boolean = false;
  textoArea = ''


  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private inscripcionService: InscripcionService
  ) { }

  obtener(event: any): string {
    return event.target.value;
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }



  ngOnInit(): void {
    if (sessionStorage.getItem('currentTab')) {
      this.openTab = Number(sessionStorage.getItem('currentTab'));
    }
  }

  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
    sessionStorage.setItem('currentTab', this.openTab.toString());
  }

}
