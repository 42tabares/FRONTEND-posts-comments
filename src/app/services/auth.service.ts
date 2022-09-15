import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) { }

  googleLogin(){
    return signInWithPopup(this.auth, new GoogleAuthProvider)
  }
  
}
