import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Post } from '../models/post';
import { createPost } from '../models/createPost';
import { CommentType } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private client:HttpClient) { }

  bringAllpost(){
    return this.client.get<Post[]>('https://beta-posts-comments-42t.herokuapp.com/getAll/posts')

  }
  bringPostByID(id:string){
    return this.client.get<Post>('https://beta-posts-comments-42t.herokuapp.com/getpostbyid/'+ id)

  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  createPost(body:createPost):Observable<Object>{
   return this.client.post('https://alpha-posts-comments-42t.herokuapp.com/create/post', body, this.httpOptions)
  }
  addComment(body:CommentType):Observable<Object>{
    return this.client.post('https://alpha-posts-comments-42t.herokuapp.com/add/comment', body, this.httpOptions)
  }


}
