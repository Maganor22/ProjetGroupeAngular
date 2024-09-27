import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Firestore, collectionData, collection, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service.service';
// import { FriendService } from '../../services/friend.service';

interface User {
  id?: string;
  name: string;  
}

interface Friend {
  id?: string,
  isFriend: boolean,
  name: string;  

}


@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {

  private firestore: Firestore = inject(Firestore);
  private authService: AuthServiceService = inject(AuthServiceService);
  users$: Observable<User[]>;
  friend$: Observable<Friend[]>;
  listUsers: User[] = [];
  userList: User[] = [];
  myName: string = '';
  friendList: any[] = [];
  myUserList: User[] = [];
  

  constructor(){
    const userCollection = collection(this.firestore, 'utilisateurs');
    this.users$ = collectionData(userCollection, { idField: 'id' }) as Observable<User[]>;

    const friendList = collection(this.firestore, 'friendlist');
    this.friend$ = collectionData(friendList, { idField: 'id' }) as Observable<Friend[]>;

    const currentUser = this.authService.getUser();
    if (currentUser) {
      this.myName = currentUser;
    }
    this.users$.subscribe((users) => {
      this.myUserList = users;
    });
    
  }

  // getUsers() {
  //   this.users$.subscribe((users) => {
  //     this.listUsers = users;
  //   });
  // }

  
  
  addFriend(user: any){
    const currentUser = this.authService.getUser();
    const friendList = collection(this.firestore, 'friendlist');
    addDoc(friendList, {
      name: user.name,
      friend: currentUser,
    });
    this.myUserList.forEach(u => {
      this.myUserList.slice(user, 1)
    });


  // getNoFriendsList(user: any) {
  //   
    
    // users.subscribe((users) => {
    //   this.listUsers = users;
    //   this.myUserList = this.friendList.filter(
    //     (user) => user.friend !== user.name
    //   );
    // });
    }
}
