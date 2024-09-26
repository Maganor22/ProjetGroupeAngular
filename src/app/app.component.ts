import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FirebaseComponent } from './component/firebase/firebase.component';
import { ConnexionComponent } from "./component/connexion/connexion.component";
import { ArticlesComponent } from "./component/articles/articles.component";
import { MessagerieComponent } from "./component/messagerie/messagerie.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FirebaseComponent, ConnexionComponent, ArticlesComponent, MessagerieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard';
}
