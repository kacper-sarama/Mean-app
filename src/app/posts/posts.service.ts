import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class PostsService {

  private postList: Post[] = [];
  private updatedPostList = new Subject<Post[]>();

  getPosts() {
    return [...this.postList];
  }

  addPostToPostList(recievedPost) {
    this.postList.push(recievedPost);
    this.updatedPostList.next([...this.postList]);
  }

  postListUpdateListener() {
    return this.updatedPostList.asObservable();
  }


}
