// import { Injectable, inject } from '@angular/core';
// import { Firestore, collectionData, collection, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthServiceService } from './auth-service.service';

// interface Friends {
//   id?: number;
//   isFriend: boolean;
// }
// interface fRequest {
//   id?: number;
//   name: string;
// }

// interface User {
//   id?: string;
//   name: string;  
// }

// @Injectable({
//   providedIn: 'root'
// })



// export class FriendService {

//   private authService: AuthServiceService = inject(AuthServiceService);
//   // private friending: FriendService = inject(FriendService);

//   users$: Observable<User[]>;
//   friends$: Observable<Friends[]>;
//   // userFriendRequests$: Observable<fRequest[]>;


//   private firestore: Firestore = inject(Firestore);

//   constructor() { 
//     const friendList = collection(this.firestore, 'friendlist');
//     // const friendRequests = collection(this.firestore, 'friendlist/friend-request');
//     const userCollection = collection(this.firestore, 'utilisateurs');
//     this.friends$ = collectionData(friendList, { idField: 'id' }) as Observable<Friends[]>;
//     this.users$ = collectionData(userCollection, { idField: 'id' }) as Observable<User[]>;
//   }

//   // addFriend(user: User) {
//   //   const friendRequests = collection(this.firestore, 'friendlist/friend-request');
//   //   addDoc(friendRequests, {name : user.name})
//   // }

// }
