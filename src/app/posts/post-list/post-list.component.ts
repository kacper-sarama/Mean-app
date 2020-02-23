import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-post-list",
  templateUrl: "post-list.component.html",
  styleUrls: ["post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {

  postList: Post[] = [];;
  listenForPostsUpdate: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postList = this.postsService.getPosts();
    this.listenForPostsUpdate = this.postsService.postListUpdateListener().subscribe((posts: Post[]) => {
      this.postList = posts;
    });
  }

  ngOnDestroy() {
    this.listenForPostsUpdate.unsubscribe();
  }
}
