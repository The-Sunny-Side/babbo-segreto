import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Importa HttpClientModule

type Regali = {
  [key: string]: {
    nome: string;
    foto: string;
  };
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule], // Aggiungi HttpClientModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  title = 'babbo_segreto';
  regali: Regali = {}; // Sarà popolato dopo il caricamento del file
  to_show = "";
  img_src = "";

  // Metodo per caricare il file regali.json
  getRegali() {
    this.http.get<Regali>('/assets/_files/regali.json').subscribe(
      (data) => {
        this.regali = data;
      },
      (error) => {
        console.error('Errore durante il caricamento del file regali.json:', error);
        this.to_show = 'Errore nel caricamento dei regali. Controlla la connessione.';
      }
    );
  }

  // Funzione per gestire il sorteggio
  onSubmit(e: any) {
    // Controlla che i regali siano stati caricati
    if (Object.keys(this.regali).length === 0) {
      this.to_show = "Attendi, sto caricando la lista di regali...";
      return;
    }

    // Ottieni tutte le chiavi dell'oggetto regali
    const keys = Object.keys(this.regali);

    // Numero di volte che verranno mostrate immagini casuali
    const maxIterations = 10;
    let iterationCount = 0;

    // Durante il "mescolamento" mostro un messaggio generico
    this.to_show = "Attendi... consulto la lista di Babbo Natale...";

    // Intervallo per cambiare rapidamente l'immagine
    const interval = setInterval(() => {
      // Prendi una chiave casuale
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      // Mostra l'immagine associata a quella chiave
      this.img_src = this.regali[randomKey]?.foto || "assets/not_found.png";

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

  // Metodo chiamato al caricamento del componente
  ngOnInit() {
    this.getRegali(); // Carica il file dei regali all'inizio
  }
}
