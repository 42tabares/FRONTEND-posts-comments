import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CommentType } from 'src/app/models/comment';
import { RequestService } from 'src/app/services/request.service';
import { SocketService } from 'src/app/services/socket.service';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { RouterTestingModule } from "@angular/router/testing";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  @Input()  post?:Post;

  newAuthor:string = '';
  newContent:string = '';
  postID:string = '';
  socketManager?:WebSocketSubject<CommentType>;

  constructor(
    private request: RequestService,
    private socket: SocketService
  ) { }

  ngOnInit(): void {
    this.identifyPost();
    this.establishConnection();
  }

  identifyPost(){
    this.postID = this.post?.aggregateId!
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

  establishConnection(){
    
    this.socketManager = this.socket.connectToPost(this.postID);
    this.socketManager?.subscribe((message) => {
      this.addComment(message)})

  }

  addComment(comment:CommentType){

    this.newContent= ''
    this.newAuthor = ''
    this.post?.comments.unshift(comment)

  }

}
