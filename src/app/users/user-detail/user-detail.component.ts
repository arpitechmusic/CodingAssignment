import { Component, OnInit } from "@angular/core";
import { IUser } from "src/app/users/user";
import { UserService } from "../user.service";
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"]
})
export class UserDetailComponent implements OnInit {
  pageTitle: string = "User Activity Details";
  user$: Observable<IUser>;
  errorMessage: string = "Unable to retrieve user";
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
 
    this.user$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.userService.getUser(+params.get("id1"),+params.get("id2"));
      })
    );
  }
}
