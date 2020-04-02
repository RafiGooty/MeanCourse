import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../posts.service';
import{Post} from '../post.model'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  private postsSub: Subscription;

  posts:Post[]=[]
  constructor(private postsServices:PostsService) { }

  ngOnInit(): void {
    this.postsServices.getPosts();
   this.postsSub= this.postsServices.getPostUpdateListtner().subscribe((data:Post[])=>{
    this.posts=data;
    });
    console.log(this.posts);
    console.log(this.postsServices.posts);
  }




}
