import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collectionData, collection, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service.service';

interface User {
  id?: string;
  name: string;
  password: string;
}

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `./connexion.component.html`,
  styleUrl: './connexion.component.css'
})

export class ConnexionComponent {
  private firestore: Firestore = inject(Firestore);
  private authService: AuthServiceService = inject(AuthServiceService);
  
  users$: Observable<User[]>;
  newUserName = '';
  newUserPassword = '';
  userName = '';
  userPassword = '';
  message: string = '';

  constructor() {
    const userCollection = collection(this.firestore, 'utilisateurs');
    this.users$ = collectionData(userCollection, { idField: 'id' }) as Observable<User[]>;
  }

  addUser() {
    if (this.newUserName != "" && this.newUserPassword != "") {
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

  connectUser() {
    if (this.userName.trim()) {
      const userCollection = collection(this.firestore, 'utilisateurs');
      const users$ = collectionData(userCollection, { idField: 'id' }) as Observable<User[]>;
      users$.subscribe(users => {
        const user = users.find(u => u.name === this.userName && u.password === this.userPassword);
        if (user) {
          this.message = 'Connexion réussie';
          this.authService.setUser(this.userName);
        } else {
          this.message = 'Connexion échouée';
        }
      });
    }
  }
}