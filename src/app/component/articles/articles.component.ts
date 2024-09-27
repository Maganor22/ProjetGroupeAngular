import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collectionData, collection, addDoc, deleteDoc, doc, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service.service';

interface Article {
  id?: string;
  Auteur: string;
  Titre: string;
  Contenu: string;
  date: number;
  like: number;
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
  private authService: AuthServiceService = inject(AuthServiceService);

  myName: string = '';
  listArticles: any[] = [];
  sortedArticles: any[] = [];

  constructor() {
    const articleCollection = collection(this.firestore, 'articles');
    const currentUser = this.authService.getUser();
    if (currentUser) {
      this.myName = currentUser;
    }

    this.sortArticlesDate();
  }

  sortArticlesDate() {
    const articleCollection = collection(this.firestore, 'articles');
    const articles$ = collectionData(articleCollection, { idField: 'id' }) as Observable<Article[]>

    articles$.subscribe((articles) => {
      this.listArticles = articles.sort((a, b) => b.date - a.date)
    })
  }
  sortArticlesLike() {
    const articleCollection = collection(this.firestore, 'articles');
    const articles$ = collectionData(articleCollection, { idField: 'id' }) as Observable<Article[]>

    articles$.subscribe((articles) => {
      this.listArticles = articles.sort((a, b) => a.like - b.like)
    })
  }

  newArticle = "";
  newArticleTitle = "";

  addArticle() {
    let today: number = Date.now();

    if (this.newArticle) {
      const articleCollection = collection(this.firestore, 'articles');
      addDoc(articleCollection, { Titre: this.newArticleTitle, Contenu: this.newArticle, date: today, Auteur: this.myName });
      this.newArticleTitle = '';
      this.newArticle = '';
    }
  }

  // addLike(articleId: string | undefined) {
  //   if (articleId) {
  //     const taskDocRef = doc(this.firestore, 'articles', articleId);
  //     addDoc(taskDocRef, { Titre: this.newArticleTitle, Contenu: this.newArticle, date: today, Auteur: this.myName });

  //   }
  // }

  deleteArticle(articleId: string | undefined) {
    if (articleId) {
      const taskDocRef = doc(this.firestore, 'articles', articleId);
      deleteDoc(taskDocRef);
    }
  }
}