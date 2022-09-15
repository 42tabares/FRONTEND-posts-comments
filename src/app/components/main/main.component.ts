import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Post } from '../../models/post';
import { createPost } from '../../models/createPost';
import { WebSocketSubject } from 'rxjs/webSocket';
import { SocketService } from 'src/app/services/socket.service';
import { StateService } from 'src/app/services/state.service';

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
  actualState:any 

  constructor(
    private request:RequestService, 
    private socket:SocketService,
    private state:StateService,
    ){}

  ngOnInit(): void {
    this.validate();
    this.buildPosts();
    this.establishConnection();
  }

  validate(){
    let validation = false;
    this.state.state.subscribe(currentState =>{
      if(!currentState.loggedIn){
        return
      }
      validation = true
      this.actualState = currentState
    })
    return validation
  }

  buildPosts(){
    console.log("BUILDINGPOSTS")
    this.request.bringAllpost().subscribe(posts =>
     {this.posts = posts} )
     console.log("POSTSBUILT")
  }

  submitPost(){
    const newCommand:createPost = {
    postId: Math.floor(Math.random() * 100000).toString(),
    title: this.newTitle,
    author: this.newAuthor,
    favorite: this.favorite
    }

    console.log(this.actualState.token)

    this.request.createPost(newCommand,this.actualState.token.access_token).subscribe()
    this.newTitle= ''
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
