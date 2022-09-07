import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/services/models';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  posts ?: Post[]
  
  constructor(private requests:RequestService) { }

  //Will execute after main.componenet is rendered on the page
  ngOnInit(): void {
    this.bringPosts()
  }

  bringPosts(){
    this.requests.bringAllPosts().subscribe(posts => this.posts = posts)
  }

}
