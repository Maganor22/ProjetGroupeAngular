import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseComponent } from './component/firebase/firebase.component';
import { ConnexionComponent } from "./component/connexion/connexion.component";
import { MessagerieComponent } from "./component/messagerie/messagerie.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FirebaseComponent, ConnexionComponent, MessagerieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard';
}
