import { Component, EventEmitter, Output } from "@angular/core";
import { Post } from "../post.model";
import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-create,",
  templateUrl: "post-create.component.html",
  styleUrls: ["post-create.component.css"]
})
export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";

  constructor(public postsService: PostsService) {}

  onAddPost(postForm: NgForm) {
    if (postForm.valid) {
      console.log(postForm.control.value);
      this.postsService.addPostToPostList(postForm.control.value);
      postForm.resetForm();
    } else {
      return;
    }
  }

}
