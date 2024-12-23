import { Routes } from '@angular/router';
import { AppComponent } from './app.component'; // Assicurati che il percorso sia corretto

export const routes: Routes = [
  { path: '', component: AppComponent }, // Home page
  { path: '**', redirectTo: '' }         // Fallback per rotte sconosciute
];
