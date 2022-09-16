import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { StateService } from 'src/app/services/state.service';


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  @Input()  post?:Post;

  actualState:any

  constructor(
    private state: StateService
  ) { }

  ngOnInit(): void {
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

  selectPost(){
    this.state.postSelected.next(this.post!)
  }


}
