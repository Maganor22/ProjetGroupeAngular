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

interface GroupedMessages {
  user: string;
  messages: any[];
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
  listMyMessages: any[] = [];
  groupedMessages: GroupedMessages[] = [];
  dayDate: number = Date.now();

  myName: string = '';

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
    this.getAllMessages();
    this.getMyMessages();
    this.loadMessages();
  }

  loadMessages() {
    const messagesCollection = collection(this.firestore, 'messages');
    const messages$ = collectionData(messagesCollection, { idField: 'id' }) as Observable<any[]>;
  
    messages$.subscribe((messages) => {
      // Trier les messages par date décroissante
      this.listMessages = messages.sort((a, b) => b.date - a.date);
      
      // Filtrer les messages qui me concernent
      this.listMyMessages = this.listMessages.filter(
        (msg) => msg.receiverName === this.myName || msg.name === this.myName
      );
      
      // Regrouper et trier les messages par utilisateur
      this.groupMessagesByUser();
    });
  }
  
  // Méthode pour regrouper les messages par utilisateur
  groupMessagesByUser() {
    const grouped = this.listMyMessages.reduce((acc, message) => {
      const user = message.name === this.myName ? message.receiverName : message.name;
  
      if (!acc[user]) {
        acc[user] = [];
      }
  
      acc[user].push(message);
      return acc;
    }, {});
  
    // Transformer l'objet en tableau de GroupedMessages
    this.groupedMessages = Object.keys(grouped).map(user => ({
      user: user,
      // Trier les messages de chaque utilisateur par date décroissante
      messages: grouped[user].sort((a: any, b: any) => b.date - a.date)
    }));
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

  getMyMessages() {
    const messagesCollection = collection(this.firestore, 'messages');
    const messages = collectionData(messagesCollection, {
      idField: 'id',
    }) as Observable<any[]>;
    messages.subscribe((messages) => {
      this.listMyMessages = messages;
    });
    return messages;
  }

  sendMessageUser(user: User) {
    const currentUser = this.authService.getUser();
    if (currentUser == '') {
      this.messageDisplay = 'Veuillez vous connecter pour envoyer un message';
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
        date: this.dayDate,
      });
    }
  }
}
