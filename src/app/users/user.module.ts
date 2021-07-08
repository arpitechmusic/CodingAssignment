import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { UsersComponent } from "./user-list/user-list.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { PostDetailComponent } from "../posts/post-detail/post-detail.component";
import { CommentComponent } from "../posts/comments/comments.component";

@NgModule({
  declarations: [UsersComponent, UserDetailComponent,AddUserComponent,
 PostDetailComponent,CommentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild([
      { path: "users", component: UsersComponent },
      { path: "users/:id1/:id2", component: UserDetailComponent },
      { path: "user/new", component: AddUserComponent},
      { path: "posts/:id", component: PostDetailComponent },
      { path: "comments/:id", component: CommentComponent }
    ])
  ],
  exports: [RouterModule, UsersComponent]
})
export class UserModule {}
