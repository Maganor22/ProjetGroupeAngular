import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../../services/auth-service.service';

interface User {
  id?: string;
  name: string;
  password: string;
}

interface Message {
  id?: string;
  name: string;
  receiverName: string;
  message: string;
  date: number;
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
  listMessages: Message[] = [];
  dayDate: number = 0;
  myName: string = '';
  selectedUser: string | null = null;

  constructor() {
    const userCollection = collection(this.firestore, 'utilisateurs');
    this.users$ = collectionData(userCollection, {
      idField: 'id',
    }) as Observable<User[]>;

    const currentUser = this.authService.getUser();
    if (currentUser) {
      this.myName = currentUser;
    }

    this.getUsers();
    this.loadMessages();
  }

  loadMessages() {
    const messagesCollection = collection(this.firestore, 'messages');
    const messages$ = collectionData(messagesCollection, { idField: 'id' }) as Observable<Message[]>;
  
    messages$.subscribe((messages) => {
      this.listMessages = messages.sort((a, b) => a.date - b.date);
    });
  }

  getUsers() {
    this.users$.subscribe((users) => {
      this.listUsers = users;
    });
  }

  selectUser(user: string) {
    this.selectedUser = user;
  }

  getSelectedUserMessages(): Message[] {
    if (!this.selectedUser) return [];
    return this.listMessages.filter(message => 
      (message.name === this.selectedUser && message.receiverName === this.myName) ||
      (message.name === this.myName && message.receiverName === this.selectedUser)
    );
  }

  sendMessage() {
    if (!this.selectedUser) return;

    this.dayDate = Date.now();
    const currentUser = this.authService.getUser();
    if (currentUser == '') {
      this.messageDisplay = 'Veuillez vous connecter pour envoyer un message';
      return;
    }
    if (this.userMessage.trim() !== '') {
      const userCollection = collection(this.firestore, 'messages');
      addDoc(userCollection, {
        name: currentUser,
        message: this.userMessage,
        receiverName: this.selectedUser,
        date: this.dayDate,
      });
      this.userMessage = '';
    }
  }
}