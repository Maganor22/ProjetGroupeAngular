import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import {provideFirebaseApp, initializeApp} from '@angular/fire/app'
import {getFirestore, provideFirestore} from '@angular/fire/firestore'

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

const firebaseConfig = {
  apiKey: "AIzaSyBnkQ36OABYRnUX2DffkSbDlFP8CiFcu4M",
  authDomain: "projet-cda-34964.firebaseapp.com",
  projectId: "projet-cda-34964",
  storageBucket: "projet-cda-34964.appspot.com",
  messagingSenderId: "528936052457",
  appId: "1:528936052457:web:3615184929c46e0e7bf278"
};



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),
      provideFirebaseApp(() => initializeApp(firebaseConfig)), provideFirestore(() => getFirestore())]
  };