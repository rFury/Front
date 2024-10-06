import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';  // For platform check
import { User } from '../Model/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: User[] = [
    { username: 'admin', password: '123', roles: ['ADMIN'] },
    { username: 'werfelli', password: '328311', roles: ['USER'] },
  ];
  private readonly STORAGE_KEY = 'myAppUserDataKey';
  public User!: User;
  public loggedUser!: string;
  public isloggedIn: boolean = false;
  public roles!: string[];

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.loadData();
  }

  SignIn(user: User): boolean {
    let validUser = false;
    this.users.forEach((curUser) => {
      if (user.username === curUser.username && user.password === curUser.password) {
        validUser = true;
        this.User = curUser;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        this.saveData();  // Save user data locally when logged in
      }
    });
    return validUser;
  }

  isAdmin(): boolean {
    return this.roles?.includes('ADMIN') || false;
  }

  logout() {
    this.isloggedIn = false;
    this.loggedUser = '';
    this.roles = [];
    this.User = new User();  // Reset user
    this.saveData();  // Clear data from localStorage
    this.router.navigate(['/Login']);
  }

  // Save data in localStorage only if running in a browser
  saveData(): void {
    if (isPlatformBrowser(this.platformId)) {
      const data = {
        User: this.User,
        loggedUser: this.loggedUser,
        roles: this.roles,
        isloggedIn: this.isloggedIn,
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
  }

  // Load data from localStorage only if running in a browser
  private loadData(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      if (storedData) {
        const data = JSON.parse(storedData);
        this.User = data.User;
        this.loggedUser = data.loggedUser;
        this.roles = data.roles;
        this.isloggedIn = data.isloggedIn;
      }
    }
  }

  updateUserData(user: User): void {
    this.User = user;
    this.saveData();  // Save the updated user data
  }
}
