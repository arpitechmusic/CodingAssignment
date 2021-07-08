import { Component, OnInit } from "@angular/core";
import { IUser } from "../user";
import { UserService } from "../user.service";
import { Observable } from "rxjs";
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: "app-users",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UsersComponent implements OnInit {
  pageTitle: string = "Users";
  users$: IUser[];
  errorMessage: string = "Unable to get users";
  page : number = 1;
  total : number ;
  constructor(private userService: UserService) {}

  ngOnInit() {
    // get all users
    this.userService.getUserData().subscribe(userdata=>
      {
        this.total = userdata.meta.pagination.total,
        this.users$ = userdata.data
      });
  }
  handlePageChange(event) {
    this.page = event;
    this.userService.getUsersByPage(this.page).subscribe(userdata=>
      {
        this.users$ = userdata.data
      });
  }
}
