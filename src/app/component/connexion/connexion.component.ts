import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collectionData, collection, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface User {
  id?: string;
  name: string;  
}

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Crée un compte</h2>
    <input [(ngModel)]="newUserName" placeholder="Nouvel utilisateur">
    <input [(ngModel)]="newUserPassword" placeholder="Password">
    <button (click)="addUser()">Ajouter</button>
    <ul>
      <li *ngFor="let user of users$ | async">
        {{ user.name }}
        <button (click)="deleteUser(user.id)">Supprimer</button>
      </li>
    </ul>

    <h2>Connexion</h2>
    <input [(ngModel)]="newUserName" placeholder="Nouvel utilisateur">
    <input [(ngModel)]="newUserPassword" placeholder="Password">
    <button (click)="addUser()">Ajouter</button>
    <ul>
      <li *ngFor="let user of users$ | async">
        {{ user.name }}
        <button (click)="deleteUser(user.id)">Supprimer</button>
      </li>
    </ul>
  `,
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  private firestore: Firestore = inject(Firestore);
  users$: Observable<User[]>;
  newUserName = '';
  newUserPassword = '';

  constructor() {
    const userCollection = collection(this.firestore, 'utilisateurs');
    this.users$ = collectionData(userCollection, { idField: 'id' }) as Observable<User[]>;
  }

  addUser() {
    if (this.newUserName.trim()) {
      const userCollection = collection(this.firestore, 'utilisateurs');
      addDoc(userCollection, { name: this.newUserName, password: this.newUserPassword });
      this.newUserName = '';
      this.newUserPassword = '';
    }
  }

  deleteUser(userId: string | undefined) {
    if (userId) {
      const taskDocRef = doc(this.firestore, 'utilisateurs', userId);
      deleteDoc(taskDocRef);
    }
  }
}