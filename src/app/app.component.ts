import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as regaliData from './_files/regali.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'babbo_segreto';
  regali: { [key: string]: string } = regaliData;

  to_show=""
  onSubmit(e:any){
    if(this.regali[e]){
      this.to_show="devi fare un regalo a: "
      this.to_show+=this.regali[e]
    }
    else{
      this.to_show="mannaia a dio inserisci la password inviata"
    }

  }
}
