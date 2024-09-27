import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Firestore, collectionData, collection, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { FriendService } from '../../services/friend.service';

interface User {
  id?: string;
  name: string;  
}


@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule],
  template: `
  <h2>Liste d'utilisateur</h2>
  <ul>
  <li *ngFor="let user of users$ | async">
    {{ user.name }}
    <button (click)="addFriend(user.id)">Suivre</button>

  </li>
</ul>`,
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {
  private firestore: Firestore = inject(Firestore);
  users$: Observable<User[]>;

  constructor(){
    const userCollection = collection(this.firestore, 'utilisateurs');
    this.users$ = collectionData(userCollection, { idField: 'id' }) as Observable<User[]>;
  }

  addFriend(userId:any){
    const friendRequests = collection(this.firestore, 'friend-requests', userId);
    addDoc(friendRequests, { User: this.users$});
  }

}
