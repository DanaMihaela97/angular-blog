import { Component, OnInit } from '@angular/core';
import { UserModel } from '../register/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  location!: String;
user!:UserModel
authenticated:string=""
constructor(private router:Router){}
ngOnInit(){
  if(window.localStorage.getItem("authenticated") == null)
    window.localStorage.setItem("authenticated", "false")

  this.user = new UserModel();
  this.user.email = String(window.localStorage.getItem("email"))
  this.user.role = String(window.localStorage.getItem("role"))
  this.authenticated = String(window.localStorage.getItem("authenticated"))

}


}
