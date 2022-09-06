import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePostCommand, Post } from './models';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private client:HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type' : 'application/json'})
  }

  bringAllPosts(): Observable<Post[]>{
    return this.client.get<Post[]>("PENDING")
  }

  CreatePostAction(command:CreatePostCommand):Observable<object>{
    return this.client.post("http://localhost:8080/create/post", command, this.httpOptions)
  }
  
  
  
}
