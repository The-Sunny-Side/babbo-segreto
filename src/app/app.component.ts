import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as regaliData from './_files/regali.json';
import { CommonModule } from '@angular/common';

type Regali = {
  [key: string]: {
    nome: string;
    foto: string;
  };
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'babbo_segreto';
  regali: Regali = regaliData;

  to_show = "";
  img_src = "";

  onSubmit(e: any) {
    // Ottieni tutte le chiavi dell'oggetto regali
    const keys = Object.keys(this.regali);

    // Numero di volte che verranno mostrate immagini casuali
    const maxIterations = 10; 
    let iterationCount = 0;

    // Durante il "mescolamento" mostro un messaggio generico
    this.to_show = "Attendi... consulto la lista di babbo...";

    // Intervallo per cambiare rapidamente l'immagine
    const interval = setInterval(() => {
      // Prendi una chiave casuale
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      // Mostra l'immagine associata a quella chiave
      this.img_src = this.regali[randomKey].foto;

      iterationCount++;
      // Se abbiamo raggiunto il numero prefissato di iterazioni...
      if (iterationCount >= maxIterations) {
        clearInterval(interval); // Ferma il sorteggio

        // Ora mostra l'immagine corretta se la password è valida
        if (this.regali[e]) {
          this.to_show = "Devi fare un regalo a: " + this.regali[e].nome;
          this.img_src = this.regali[e].foto;
        } else {
          this.img_src = "assets/not_found.png";
          this.to_show = "Eh no bello, hai sbagliato qualcosa... se non tutto";
        }
      }
    }, 200); // Ogni 200 millisecondi verrà mostrata una nuova immagine casuale
  }
}
