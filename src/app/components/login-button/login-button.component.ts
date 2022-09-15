import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
    private state:StateService,
    private request:RequestService
    ) { }

  ngOnInit(): void {
  }

  async loginGoogle(){
    const response = await this.authService.googleLogin()
    if (response){

      
      //If there's a response we will request a token
      this.request.loginRequest({
        username:response.user.email,
        password:response.user.email
      }).subscribe(token => {
        
        console.log(token)
        if (token){
          //When we got the token we'll update the state
          this.state.state.next({
            loggedIn: true,
            authenticatedPerson: response,
            token:token
          })
        }

      })
    }
  }

}
