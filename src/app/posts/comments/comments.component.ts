import { Component, OnInit , Input } from "@angular/core";
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { switchMap, map, tap } from "rxjs/operators";
import { CommentService } from "../comment.service";
import { IComment } from "../models/comment";

@Component({
  selector: "comment-detail",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"]
})
export class CommentComponent implements OnInit {
  @Input() public id : number;
  pageTitle: string = "Comments";
  errorMessage: string = "Unable to get comments";
  comment$: Observable<IComment[]>;

  constructor(
    private commentService: CommentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.comment$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.commentService.getCommentByPostId(this.id);
      })
    );

  }

}
