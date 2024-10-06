import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers :[  ]
})
export class AppComponent implements OnInit {
  title = 'Cars';
  Admin !: Boolean;
  Name !: String;
  connected !: Boolean;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
      this.Admin = this.authService.isAdmin();
      this.Name = this.authService.loggedUser;
    if (this.authService.isloggedIn != true || !this.authService.loggedUser)
      {this.router.navigate(['/Login']);}
    else
      this.connected=true;
  }

  logout(){
    this.connected=false;
    this.authService.logout();
  }
}
