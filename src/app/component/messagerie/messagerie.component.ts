import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service.service';

interface User {
  id?: string;
  name: string;
  password: string;
}

@Component({
  selector: 'app-messagerie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messagerie.component.html',
  styleUrl: './messagerie.component.css',
})
export class MessagerieComponent {
  private firestore: Firestore = inject(Firestore);
  private authService: AuthServiceService = inject(AuthServiceService);

  users$: Observable<User[]>;
  messageDisplay: string = '';
  userMessage: string = '';
  listUsers: User[] = [];
  listMessages: any[] = [];

  myName: string = '';

  constructor() {
    const userCollection = collection(this.firestore, 'utilisateurs');
    this.users$ = collectionData(userCollection, {
      idField: 'id',
    }) as Observable<User[]>;

    this.getUsers();
    this.getAllMessages();
  }

  getUsers() {
    this.users$.subscribe((users) => {
      this.listUsers = users;
    });
  }

  getAllMessages() {
    const messagesCollection = collection(this.firestore, 'messages');
    const messages = collectionData(messagesCollection, {
      idField: 'id',
    }) as Observable<any[]>;
    messages.subscribe((messages) => {
      this.listMessages = messages;
    });
    return messages;
  }

  sendMessageUser(user: User) {
    const currentUser = this.authService.getUser(); 
    if (currentUser == '') {
      this.messageDisplay = "Veuillez vous connecter pour envoyer un message";
      return;
    }
    this.messageDisplay = '';
    
    if (this.userMessage == '') {
      this.messageDisplay = 'Veuillez remplir le champ message';
    } else {
      this.messageDisplay = 'Message envoyé';
      const userCollection = collection(this.firestore, 'messages');
      addDoc(userCollection, {
        name: currentUser,
        message: this.userMessage,
        receiverName: user.name,
      });
    }
  }
}
