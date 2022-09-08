import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Post } from '../../models/post';
import { createPost } from '../../models/createPost';
import { WebSocketSubject } from 'rxjs/webSocket';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  socketManager?:WebSocketSubject<Post>;
  posts?:Post[];

  newTitle:string = '';
  newAuthor:string = '';
  favorite:string = '';

  constructor(
    private request:RequestService, 
    private socket:SocketService) 
    {}

  ngOnInit(): void {
   this.buildPosts();
   this.establishConnection();
  }

  buildPosts(){
    this.request.bringAllpost().subscribe(posts =>
     {this.posts = posts} )
  }

  submitPost(){
    const newCommand:createPost = {
    postId: Math.floor(Math.random() * 100000).toString(),
    title: this.newTitle,
    author: this.newAuthor,
    favorite: this.favorite
    }

    this.request.createPost(newCommand).subscribe()
    this.newTitle= ''
    this.newAuthor = ''
  }

  establishConnection(){
    this.socketManager = this.socket.connectToGeneral();
    this.socketManager.subscribe((message) =>{
      this.addPost(message)
    })
  }

  addPost(post:Post){
    this.newAuthor = ''
    this.newTitle = ''
    this.posts?.unshift(post)
  }

  closeSocketConnection(){
    this.socketManager?.complete();
  }



}
