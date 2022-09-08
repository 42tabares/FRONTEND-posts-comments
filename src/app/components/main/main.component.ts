import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Post } from '../../models/post';
import { createPost } from '../../models/createPost';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  posts?:Post[];

  newTitle:string = '';
  newAuthor:string = '';
  favorite:string = '';

  constructor(private request:RequestService) { }

  ngOnInit(): void {
   this.buildPosts();
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


}
