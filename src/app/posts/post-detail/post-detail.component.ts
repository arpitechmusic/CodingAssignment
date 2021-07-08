import { Component, OnInit , Input} from "@angular/core";
import { IPost } from "../models/post";
import { Observable } from "rxjs";
import { PostService } from "../post.service";
import { Router, ActivatedRoute } from "@angular/router";
import { switchMap, map, tap } from "rxjs/operators";
import { UserService } from "src/app/users/user.service";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.css"]
})
export class PostDetailComponent implements OnInit {
  @Input() public id : number;
  pageTitle: string = "Post details";
  errorMessage: string = "Unable to get users";
  post$: Observable<IPost[]>;
  username$: Observable<string>;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.postService.getPostById(this.id);
      })
    );
  }

}
