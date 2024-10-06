import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth-service.service';
import { User } from '../Model/User.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  user = new User();
  err : number = 0;

  constructor(private authService : AuthService,
              private router: Router,
            private appComponent : AppComponent ) { }

  ngOnInit(): void {
  }

  onLoggedin()
    {
      console.log(this.user);
      let isValidUser: Boolean = this.authService.SignIn(this.user);
      if (isValidUser){
          this.appComponent.connected = true;
          this.router.navigate(['/']);}
      else{
         this.err=1;}

    }

    

}
