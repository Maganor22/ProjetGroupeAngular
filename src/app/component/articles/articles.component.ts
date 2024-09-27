import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collectionData, collection, addDoc, deleteDoc, doc, updateDoc, arrayUnion, arrayRemove} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service.service';

interface Article {
  id?: string;
  Auteur: string;
  Titre: string;
  Contenu: string;
  date: number;
  like: string[];
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
    const articles$ = collectionData(articleCollection, { idField: 'id' }) as Observable<Article[]>
    const currentUser = this.authService.getUser();
    if (currentUser) {
      this.myName = currentUser;
    }

    // articles$.subscribe((articles) =>
    //   this.listArticles.indexOf(this.myName) !== -1
      
      
    // )
    // if(article$.subscribe){
    //   this.isChecked = true;
    // } else {
    //   this.isChecked = false;
    // }

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
      this.listArticles = articles.sort((a, b) => b.like?.length - a.like?.length)
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

  addLike(articleId: string | undefined) {
    if (articleId) {
      const taskDocRef = doc(this.firestore, 'articles', articleId);
      updateDoc(taskDocRef, { like: arrayUnion(this.myName)});

    }
  }
  removeLike(articleId: string | undefined) {
    if (articleId) {
      const taskDocRef = doc(this.firestore, 'articles', articleId);
      updateDoc(taskDocRef, { like: arrayRemove(this.myName)});
    }
  }

  isChecked:boolean = false;

  onCheckboxChange(event:any, articleId: string | undefined){
    // this.isChecked = event.target.checked;
    console.log(event.target.checked)
    if(event.target.checked){
      this.addLike(articleId)
      this.isChecked = true;
      console.log(articleId)
    } else {
      this.removeLike(articleId);
      this.isChecked = false;
    }
  }
  
  deleteArticle(articleId: string | undefined) {
    if (articleId) {
      const taskDocRef = doc(this.firestore, 'articles', articleId);
      deleteDoc(taskDocRef);
    }
  }
}