import { Injectable } from "@angular/core";
import { Observable, throwError, forkJoin, of } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IPost } from "./models/post";
import {
  tap,
  catchError,
  shareReplay,
  map,
  distinctUntilChanged
} from "rxjs/operators";

class Hello {
  constructor(public world: string) {}
}
@Injectable({
  providedIn: "root"
})
export class PostService {

  private postUrl: string = "https://gorest.co.in/public-api/users";

  private allPosts: Observable<IPost[]> = this.http
  .get<IPost[]>(this.postUrl)
  // shareReplay caches the response, distinct only updates data if it changes
  .pipe(distinctUntilChanged(), shareReplay(1));

  constructor(private http: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    return this.allPosts.pipe(
      tap(posts => console.log("Getting posts")),
      catchError(this.handleError)
    );
  }

  // both are the same
  getPost(id: number): Observable<IPost> {
    return this.allPosts.pipe(
      map(posts => posts.find(post => post.id === id)),
      tap(post => console.log("Getting book...")),
      catchError(this.handleError)
    );
  }

  getPostById(id: number) : Observable<any> {
    return this.http
      .get<any>(`${this.postUrl}/${id}/posts`)
      .pipe(tap(console.log),      
       tap(posts => console.log("Getting posts..",posts.data)),
       map(posts => posts.data),
       catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle it accordingly!
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
