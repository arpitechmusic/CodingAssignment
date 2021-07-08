import { Injectable } from "@angular/core";
import { HttpClient , HttpErrorResponse} from "@angular/common/http";
import { Observable , throwError} from "rxjs";
import { IComment } from "./models/comment";
import { map , catchError , tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CommentService {
  commentUrl: string = "https://gorest.co.in/public-api/posts";

  constructor(private http: HttpClient) {}

  getCommentByPostId(id: number) : Observable<any> {
    return this.http
      .get<any>(`${this.commentUrl}/${id}/comments`)
      .pipe(tap(console.log),      
       tap(comments => console.log("Getting comments..",comments.data)),
       map(comments => comments.data),
       catchError(this.handleError));
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle it accordingly!
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
