import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collectionData, collection, addDoc, deleteDoc, doc, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Article {
  AuteurId: number;
  Titre: string;
  Contenu: string;
  date: number;
}

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {
  private firestore: Firestore = inject(Firestore)
  article$: Observable<Article[]>;
  
  
  constructor() {
    const articleCollection = collection(this.firestore, 'articles');
    this.article$ = collectionData(articleCollection,  { idField: 'id' }) as Observable<Article[]>
  }
  
  newArticle = "";
  newArticleTitle = "";
  
  addUser() {
    let today: number = Date.now();
    
    if (this.newArticle) {
      const articleCollection = collection(this.firestore, 'articles');
      addDoc(articleCollection, { Titre: this.newArticleTitle, Contenu: this.newArticle, date: today});
      this.newArticleTitle = '';
      this.newArticle = '';
    }
  }

  // deleteUser(userId: string | undefined) {
  //   if (userId) {
  //     const taskDocRef = doc(this.firestore, 'utilisateurs', userId);
  //     deleteDoc(taskDocRef);
  //   }
  // }
}
