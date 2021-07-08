import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from "../user";
import { UserService } from "../user.service";
import { Observable } from "rxjs";

@Component({
    selector:'add-user',
    templateUrl:'./add-user.component.html',
    styleUrls:['./add-user.component.css']
})
export class AddUserComponent implements OnInit
{
  form: FormGroup;
  loading = false;
  submitted = false;
  pageTitle: string = "Create New User";
  errorMessage: string = "Unable to add user";
  constructor(private formBuilder : FormBuilder ,private route: ActivatedRoute,
    private router: Router,private userService: UserService) {}

    ngOnInit(){
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
            gender: ['', [Validators.required]],
            status: ['', [Validators.required]]
        });
    }
    get f() { return this.form.controls; }

    onSubmit() {

        console.log(this.form.value);
         // // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.userService.addUser(this.form.value).subscribe(data => {
            console.log('success :'+data.code)
            alert("User created successfully");
            this.router.navigate(['users']);
        },
         error => {
            alert("Error occurred");
             this.loading = false;
                });
    }

}