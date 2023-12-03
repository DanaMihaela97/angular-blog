import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from './user.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formValue!:FormGroup;
  registerModel:UserModel = new UserModel();
  register!:UserModel;
   
  constructor(private FormBuilder:FormBuilder, private apiService:ApiService){}
  ngOnInit(): void {
    this.formValue = this.FormBuilder.group({
      username:[''],
      email:[''],
      password:['']
    })

  }
  createUserDetails(){
    this.registerModel.username=this.formValue.value.username;
  
    this.registerModel.email=this.formValue.value.email;
    this.registerModel.password=this.formValue.value.password;

    this.apiService.createUser(this.registerModel).subscribe(res =>{
      alert("Contul a fost creat!");
      this.formValue.reset();
      window.location.href="/login";
    },
    err =>{
      alert("Completează toate căsuțele!")
      this.formValue.reset();
    })
  }
}
