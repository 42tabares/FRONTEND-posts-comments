import { Component, OnInit } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { CommentType } from 'src/app/models/comment';
import { Post } from 'src/app/models/post';
import { RequestService } from 'src/app/services/request.service';
import { SocketService } from 'src/app/services/socket.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  newAuthor:string = '';
  newContent:string = '';
  connected:boolean = false;
  post?:Post;
  socketManager?:WebSocketSubject<CommentType>;

  constructor(    
    private request: RequestService,
    private state: StateService) 
    { }

  ngOnInit(): void {
    this.waitForPost();
  }

  waitForPost(){
    this.state.postSelected.subscribe((post) => {
      this.post = post
      this.connected = true;
    })
  }

  submitComment(): void{

    if (this.newContent === ''){
      alert("The Content must not be empty!")
      return
    }

    if (this.newAuthor === ''){
      this.newAuthor='Anonymous'
    }

    const newComment:CommentType = {
      commentId: Math.floor(Math.random() * 100000).toString(),
      postId: this.post?.aggregateId!,
      author: this.newAuthor,
      content: this.newContent,
      favorite: "false"
    }

    this.request.addComment(newComment).subscribe()
    this.newContent= ''
  }

}
