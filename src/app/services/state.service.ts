import { Injectable } from '@angular/core';
import { Post } from 'src/app/models/post';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  initialState = {
    loggedIn: false,
    authenticatedPerson:{},
    token:{}
  }

  state = new BehaviorSubject(this.initialState);

  postSelected = new Subject<Post>();
  
  constructor() { }
}
