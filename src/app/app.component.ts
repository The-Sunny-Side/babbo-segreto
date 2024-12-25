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
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  title = 'babbo_segreto';
  regali: Regali = {};
  to_show = "";
  img_src = "";

  getRegali() {
    this.http.get<{ data: string }>('assets/_files/xms.json').subscribe(
      (response) => {
        this.regali= JSON.parse(atob(response.data));
        console.log(this.regali); // Usa i dati decodificati
      },
      (error) => {
        console.error('Errore nel caricamento dei dati:', error);
      }
    );
  }

  onSubmit(e: any) {
    if (Object.keys(this.regali).length === 0) {
      this.to_show = "Attendi, sto caricando la lista di regali...";
      return;
    }

    const keys = Object.keys(this.regali);

    const maxIterations = 10;
    let iterationCount = 0;

    this.to_show = "Attendi... consulto la lista di Babbo Natale...";

    const interval = setInterval(() => {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      this.img_src = this.regali[randomKey]?.foto || "assets/not_found.png";

      iterationCount++;
      if (iterationCount >= maxIterations) {
        clearInterval(interval); 

        if (this.regali[e]) {
          this.to_show = "Devi fare un regalo a: " + this.regali[e].nome;
          this.img_src = this.regali[e].foto;
        } else {
          this.img_src = "assets/not_found.png";
          this.to_show = "hai sbagliato qualcosa, se non tutto... nella vita";
        }
      }
    }, 200); 
  }

  ngOnInit() {
    this.getRegali(); 
  }
}
