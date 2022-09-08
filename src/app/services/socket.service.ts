import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {postView} from '../models/postView';
import {commentView} from '../models/commentView';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }

  connectToGeneral():WebSocketSubject<postView>{
    return webSocket('ws://localhost:8082/retrieve/mainSpace')
  }

  connectToPost(post:string):WebSocketSubject<commentView>{
    return webSocket('ws://localhost:8082/retrieve/mainSpace')
  }
}
