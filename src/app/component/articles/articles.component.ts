import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collectionData, collection, addDoc, deleteDoc, doc, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Article {
  AuteurId: number;
  Titre: string;
  Contenu: string;
  date: Timestamp;
}

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
}
