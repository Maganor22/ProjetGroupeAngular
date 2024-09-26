import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseComponent } from './component/firebase/firebase.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FirebaseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard';
}
