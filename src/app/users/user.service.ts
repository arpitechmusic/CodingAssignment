import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { IUser } from "./user";
import { Observable, throwError } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";
import { from } from "rxjs";

const auth_token : any = '8c7978ffbd86316f32fec93eaf28f9c4c492b32be8f090b990ff46a3d32e92bd';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Authorization', `Bearer ${auth_token}`);

@Injectable({
  providedIn: "root"
})
export class UserService {
  userUrl: string = "https://gorest.co.in/public-api/users";
  userUrlPerPage: string = "https://gorest.co.in/public-api/users?page";
  constructor(private http: HttpClient) {}

  // GET all users
  getUsers(): Observable<any> {
    return this.http.get<any>(this.userUrl).pipe(
      tap(console.log),  
      tap(users => console.log("Getting users...",users)),
      map(users => users.data),
      catchError(this.handleError)
    );
  }

  getUserData() : Observable<any> {
    return this.http.get<any>(this.userUrl).pipe(
      tap(users => console.log("Getting users...",users)),
      map(users => users),
      catchError(this.handleError)
    );
  }

  // GET all users against page id
  getUsersByPage(id : number): Observable<any> {
    return this.http.get<any>(`${this.userUrlPerPage}=${id}`).pipe(
      tap(console.log),  
      tap(users => console.log("Getting users...",users)),
      map(users => users),
      catchError(this.handleError)
    );
  }

  // GET a user
 
  getUser(userid: number,page: number): Observable<IUser> {
    return this.getUsersByPage(page).pipe(
      tap(users => console.log("Users found: ", users.data.length)),
      map(users => users.data.find(user => user.id === userid)),
      tap(user => console.log("User found: ", user)),
      catchError(this.handleError)
    );
  }

addUser(userData) {   
  return this.http.post<any>(this.userUrl,JSON.stringify(userData),{ 'headers': headers }).pipe(
    tap(users => console.log("Users saved: ", users)),
    map(users => users),
    catchError(this.handleError)
  );
}
updateUser(userData : IUser, id){
  return this.http.put(this.userUrl + "/" + id, JSON.stringify(userData) , { 'headers': headers }).pipe(
    tap(users => console.log("Users saved: ", users)),
    tap(user => console.log("User saved: ", user)),
    catchError(this.handleError)
  );
}

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
