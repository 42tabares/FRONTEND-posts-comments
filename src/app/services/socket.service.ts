import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { CommentType } from '../models/comment';
import { Post } from '../models/post';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }

  connectToGeneral():WebSocketSubject<Post>{
    console.log("Connecting to general Socket")
    return webSocket('wss://gamma-posts-comments-42t.herokuapp.com/retrieve/mainSpace')
  }

  connectToPost(post:string):WebSocketSubject<CommentType>{
    console.log("Connecting to post... " + post)
    return webSocket('wss://gamma-posts-comments-42t.herokuapp.com/retrieve/' + post)
  }
}
