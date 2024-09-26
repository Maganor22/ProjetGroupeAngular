import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  private loggedInUser: string | null = null;

  setUser(name: string) {
    this.loggedInUser = name;
  }

  getUser(): string | null {
    return this.loggedInUser;
  }

  clearUser() {
    this.loggedInUser = null;
  }
}
