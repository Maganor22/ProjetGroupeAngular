import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Firestore, collectionData, collection, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service.service';
import { FriendlistComponent } from '../friendlist/friendlist.component';
// import { FriendService } from '../../services/friend.service';

interface User {
  id: number;
  name: string;  
  friend: string;
}

interface Friend {
  id: number;
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


  
  addFriend(user: any){
    const currentUser = this.authService.getUser();
    const friendList = collection(this.firestore, 'friendlist');
    const userList = collection(this.firestore, 'utilisateurs')
    const users = collectionData(userList, 'utilisateurs')
    addDoc(friendList, {
      name: user.name,
      friend: currentUser,
    });
    for (let i = 0; i < users.length; i++) {
      if (user.friend == this.myName ) {
        this.myUserList.splice(user, 1);
      }
    }

  // getNoFriendsList(user: any) {
  //   
    
    // users.subscribe((users) => {
    //   this.listUsers = users;
    //   this.myUserList = this.friendList.filter(
    //     (user) => user.friend !== user.name
    //   );
    // });
    }

    // isFriend(){
    //   const userCollection = collection(this.firestore, 'utilisateurs');
    //   const users = collectionData(this.firestore, {
    //     idField: 'id',
    //   }) as Observable<any[]>;

    //   const friendList = collection(this.firestore, 'friendlist');
    //   const friends = collectionData(friendList, {
    //     idField: 'id',
    //   }) as Observable<any[]>;

    //   friends.subscribe((friends) => {
    //     this.friendList= friends;
    //   })
    //   friends.subscribe((users) => {
    //     this.myUserList = users;
    //     this.myUserList = this.friendList.filter((friend) => friend.friend !== this.myName )
    //   });

    //   console.log(this.myUserList);
      
    //   return this.myUserList;
    // }

    isFriend(){
      const userCollection = collection(this.firestore, 'utilisateurs');
      const users = collectionData(this.firestore, {
        idField: 'id',
      }) as Observable<any[]>;

      const friendList = collection(this.firestore, 'friendlist');
      const friends = collectionData(friendList, {
        idField: 'id',
      }) as Observable<any[]>;
      friends.subscribe((friends) => {
        this.myUserList = friends;
        this.myUserList.map((friend) => friend.friend !== this.myName );
      });
      console.log(this.myUserList);
      
      return this.myUserList;
    }
}
