import { Injectable, effect, signal } from '@angular/core';
import { Theme } from '../models/theme.models';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  theme = signal<Theme>({ mode: 'light', color: 'base' })

  constructor() {
    this.loadTheme()
    effect(() => {
      this.setTheme()
    })
   }

   loadTheme() {
    const theme = localStorage.getItem('theme')
    if(theme){
      this.theme.set(JSON.parse(theme))
    }
  }

  setTheme() {
    localStorage.setItem('theme', JSON.stringify(this.theme()))

    document.querySelector('html')!.className = this.theme().mode; //cambia el css
    document.querySelector('html')!.setAttribute('data-theme', this.theme().color); // le pasa el color a cambiar
  }

  public get isDark(): boolean {
    return this.theme().mode == 'dark';
  }

}
