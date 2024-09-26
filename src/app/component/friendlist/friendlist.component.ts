import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConnexionComponent } from '../connexion/connexion.component';
import { FriendService } from '../../services/friend.service';

interface Friends {
  id?: string,
  isFriend: boolean,
  name: string;  

}

interface User {
  id?: string;
  name: string;  
}



@Component({
  selector: 'app-friendlist',
  standalone: true,
  imports: [CommonModule, ConnexionComponent],
  template: `
    <h2>Liste d'amis</h2>

    <ul>
      <li *ngFor="let friend of friends$ | async">
        {{ friend.name }}
        <button (click)="deleteFriend(friend.id)">Supprimer</button>
      </li>
    </ul>
  `,
  styleUrl: './friendlist.component.css'
})


export class FriendlistComponent {
  users$: Observable<User[]>;
  friends$: Observable<Friends[]>;
  private firestore: Firestore = inject(Firestore);

  constructor(private friending: FriendService) { 
    const friendList = collection(this.firestore, 'friendlist');

    this.friends$ = collectionData(friendList, { idField: 'id' }) as Observable<Friends[]>;
    const userCollection = collection(this.firestore, 'utilisateurs');
    this.users$ = collectionData(userCollection, { idField: 'id' }) as Observable<User[]>;

  }

  // addFriend(id:number) {
  //   const friendList = collection(this.firestore, 'friendlist');
  //   addDoc(friendList, {id: this.users$.id,  isFriend: true})
  // }

  deleteFriend(userId: string | undefined) {
    this.friending.deleteFriend(userId)
  }

}
