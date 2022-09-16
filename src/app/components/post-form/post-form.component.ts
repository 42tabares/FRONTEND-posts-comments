import { Component, OnInit } from '@angular/core';
import { createPost } from 'src/app/models/createPost';
import { RequestService } from 'src/app/services/request.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  newAuthor:string= '';
  newTitle:string = '';
  favorite:string = '';
  actualState:any 

  constructor(
    private request:RequestService, 
    private state:StateService,
    ){}

  ngOnInit(): void {
    this.validate();
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
}


