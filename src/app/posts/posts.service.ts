import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { stringify } from 'querystring';

@Injectable({ providedIn: "root" })
export class PostsService {

  constructor(private http: HttpClient) {

  }

  private postList: Post[] = [];
  private updatedPostList = new Subject<Post[]>();

  getPosts() {
    this.http.get<{ message: string, posts: Post[] }>("http://localhost:3000/api/posts")
      .subscribe((postData) => {
        this.postList = postData.posts;
        this.updatedPostList.next([...this.postList]);
      });
  }

  postListUpdateListener() {
    return this.updatedPostList.asObservable();
  }

  addPostToPostList(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http.post<{ message: string }>("http://localhost:3000/api/posts", post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.postList.push(post);
        this.updatedPostList.next([...this.postList]);
      });

  }



}
