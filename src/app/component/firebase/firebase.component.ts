import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collectionData, collection, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Taches {
  id?: string;
  title: string;  
}

@Component({
  selector: 'app-firebase',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Liste de Tâches</h2>
    <input [(ngModel)]="newTaskTitle" placeholder="Nouvelle tâche">
    <button (click)="addTask()">Ajouter</button>
    <ul>
      <li *ngFor="let task of tasks$ | async">
        {{ task.title }}
        <button (click)="deleteTask(task.id)">Supprimer</button>
      </li>
    </ul>
  `
})
export class FirebaseComponent {
  private firestore: Firestore = inject(Firestore);
  tasks$: Observable<Taches[]>;
  newTaskTitle = '';

  constructor() {
    const taskCollection = collection(this.firestore, 'taches');
    this.tasks$ = collectionData(taskCollection, { idField: 'id' }) as Observable<Taches[]>;
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      const taskCollection = collection(this.firestore, 'taches');
      addDoc(taskCollection, { title: this.newTaskTitle });
      this.newTaskTitle = '';
    }
  }

  deleteTask(taskId: string | undefined) {
    if (taskId) {
      const taskDocRef = doc(this.firestore, 'taches', taskId);
      deleteDoc(taskDocRef);
    }
  }
}