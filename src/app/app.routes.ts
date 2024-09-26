import { Routes } from '@angular/router';
import { ConnexionComponent } from './component/connexion/connexion.component';
import { ArticlesComponent } from './component/articles/articles.component';
import { MessagerieComponent } from './component/messagerie/messagerie.component';
// import { _ _ _Component } from './component/_ _ _/_ _ _.component';

export const routes: Routes = [
    {path: '', component: ConnexionComponent},
    {path: 'articles', component: ArticlesComponent},
    {path: 'messagerie', component: MessagerieComponent},
];
