import { Component, OnInit } from '@angular/core';
import { CommentType } from 'src/app/models/comment';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { RequestService } from 'src/app/services/request.service';
import { SocketService } from 'src/app/services/socket.service';
import { Post } from 'src/app/models/post';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-comment-main',
  templateUrl: './comment-main.component.html',
  styleUrls: ['./comment-main.component.css']
})
export class CommentMainComponent implements OnInit {

  post?:Post;
  newAuthor:string = '';
  newContent:string = '';
  postID:string = '';

  socketManager?:WebSocketSubject<CommentType>;

  constructor(    
    private request: RequestService,
    private socket: SocketService,
    private state: StateService) 
    { }

  ngOnInit(): void {
    this.waitForPost();
  }

  waitForPost(){
    this.state.postSelected.subscribe((post) => {
      
      this.establishConnection(post.aggregateId)
      this.post = post;
      console.log("LISTENING POST! " + post.comments)


    })
  }

  submitComment(): void{
    const newComment:CommentType = {
      commentId: Math.floor(Math.random() * 100000).toString(),
      postId: this.postID,
      author: this.newAuthor,
      content: this.newContent,
      favorite: "false"
    }

    this.request.addComment(newComment).subscribe()
    this.newContent= ''
    this.newAuthor = ''
  }


  establishConnection(id:string){   
    this.socketManager = this.socket.connectToPost(id);
    this.socketManager?.subscribe((message) => {
      console.log(message)
      this.addComment(message)})
  }

  addComment(comment:CommentType){

    this.newContent= ''
    this.newAuthor = ''
    this.post?.comments.unshift(comment)

  }

}
