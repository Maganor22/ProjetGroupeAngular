import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConnexionComponent } from '../connexion/connexion.component';
// import { FriendService } from '../../services/friend.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { ListUserComponent } from "../list-user/list-user.component";

interface Friends {
  id?: string,
  isFriend: boolean,
  name: string;  

}
interface FriendRequests {
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
  imports: [CommonModule, ConnexionComponent, ListUserComponent],
  template: `

    <br>
    <app-list-user></app-list-user>
    <br>


    <ul *ngIf="myName !== ''">
    <h2>Liste d'amis</h2>
      <li *ngFor="let friend of friends$ | async">
        {{ friend.name }}
        <button (click)="deleteFriend(friend.id)">Supprimer</button>
      </li>
      <br>
      <h2>Invitation</h2>
      <li *ngFor="let request of friendRequests$ | async">
        {{ request.name }}
        <button (click)="decline(request.id)">Refuser</button>
        <button (click)="accept(request.id)">Accepter</button>
      </li>
    </ul>
  `,
  styleUrl: './friendlist.component.css'
})


export class FriendlistComponent {
  myName: string = '';
  private authService: AuthServiceService = inject(AuthServiceService);
  // private friending: FriendService = inject(FriendService);


  users$: Observable<User[]>;
  friends$: Observable<Friends[]>;
  friendRequests$: Observable<FriendRequests[]>;
  listUsers: User[] = [];
  friendList: any[] = [];
  friendRequests: any[] = [];
  private firestore: Firestore = inject(Firestore);

  constructor() { 
    const currentUser = this.authService.getUser();
    if (currentUser) {
      this.myName = currentUser;
    }

    // this.getUsers();
    // this.getFriendRequests();
    // this.getFriendsList();

    const friendRequests = collection(this.firestore, 'friend-requests')
    const friendList = collection(this.firestore, 'friendlist');
    this.friends$ = collectionData(friendList, { idField: 'id' }) as Observable<Friends[]>;
    this.friendRequests$ = collectionData(friendRequests, { idField: 'id' }) as Observable<FriendRequests[]>;
    // this.friends$ = collectionData(friendRequests, { idField: 'id' }) as Observable<Friends[]>;
    const userCollection = collection(this.firestore, 'utilisateurs');
    this.users$ = collectionData(userCollection, { idField: 'id' }) as Observable<User[]>;

  }

  // addFriend(id:number) {
  //   const friendList = collection(this.firestore, 'friendlist');
  //   addDoc(friendList, {id: this.users$.id,  isFriend: true})
  // }

  // getUsers() {
  //   this.users$.subscribe((users) => {
  //     this.listUsers = users;
  //   });
  // }

  getFriendRequests() {
    const friendRequests = collection(this.firestore, 'friend-requests');
    const request = collectionData(friendRequests, {
      idField: 'id',
    }) as Observable<any[]>;
    request.subscribe((request) => {
      this.friendRequests = request;
    });
    return request;
  }

  // getFriendsList() {
  //   const friendList = collection(this.firestore, 'friendlist');
  //   const friends = collectionData(friendList, {
  //     idField: 'id',
  //   }) as Observable<any[]>;
  //   friends.subscribe((friends) => {
  //     this.friendList = friends;
  //   });
  //   return friends;
  // }

  deleteFriend(userId: string | undefined) {
    if (userId) {
      const userDocRef = doc(this.firestore, 'friendlist', userId);
      deleteDoc(userDocRef);
    }
  }
  decline(userId: string | undefined) {
    if (userId) {
      const userDocRef = doc(this.firestore, 'friend-requests', userId);
      deleteDoc(userDocRef);
    }
  }
  accept(userId: string | undefined) {
    if (userId) {
      const userDocRef = doc(this.firestore, 'friend-requests', userId);
      deleteDoc(userDocRef);
    }
  }

}
