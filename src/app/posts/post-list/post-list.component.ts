import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';

import { PostsService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {

  // posts = [
  //   {title: 'first post', content: 'this is a post' },
  //   {title: 'second post', content: 'this is a post' },
  //   {title: 'third post', content: 'this is a post' }

  // ];
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor( public postsService: PostsService) {}

  ngOnInit() {
        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListener()
          .subscribe((posts: Post[]) => {
            this.posts = posts;
          });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}

