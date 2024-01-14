import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserLogin } from './userlogin';
import { userRequest } from '../userRequest';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
 
  signUpForm!: FormGroup;
  user !: UserLogin;
  token = {
    "iat": "",
    "exp": "",
    "sub": "",
    "role": ""
  };
  userForm: userRequest = new userRequest();
  constructor(private formBuilder: FormBuilder,
    private router: Router, private api: ApiService) { }
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }
  parseJwt(token: String) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  signUp() {
    this.userForm.username = this.signUpForm.value.username
    this.userForm.password = this.signUpForm.value.password
    this.api.signIn(this.userForm).subscribe({
      next: (res) => {
        this.token = this.parseJwt(res.token)
        this.api.getUser(this.token.sub).subscribe({next: (resUser: UserLogin)=>{
          this.user = resUser
          console.log(this.user)
          if (this.user.username == this.userForm.username) {
            window.localStorage.clear()
            window.localStorage.setItem("username", this.user.username)
            window.localStorage.setItem("email", this.user.email)
            window.localStorage.setItem("role", this.user.role)
            window.localStorage.setItem("authenticated", "true")
            window.localStorage.setItem("jwt", res.token)
            this.signUpForm.reset();
            this.router.navigate(['/blogs']).then(() => {
              window.location.reload();
            })
          }
        }})
      },
      error: () => {
        alert("Email sau parola greșită! Încearcă din nou.")
        this.signUpForm.get("password")?.reset();
      }
    })
}
}