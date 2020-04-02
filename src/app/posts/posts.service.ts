import { Injectable } from '@angular/core';
import {Post} from './post.model'
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
public posts:Post[]=[];
private postsUpdated= new Subject<Post[]>();

  constructor(private http:HttpClient) { }
  getPosts(){
      this.http.get<{message:string,posts:Post[]}>('http://localhost:3000/apps/data')
      .subscribe((data)=>{
           this.posts=data.posts
           console.log(this.posts,3);
           console.log(data.posts,4);
           this.postsUpdated.next(this.posts);
    });
  }

  getPostUpdateListtner(){
    return this.postsUpdated.asObservable();
  }

  addPost(title:string,content:string){
    const post :Post={title:title,content:content}
    this.http.post<{message:string}>("http://localhost:3000/apps/data",post).subscribe((responseData)=>{
    console.log(responseData.message)
    this.posts.push(post);
    })

  }
}
