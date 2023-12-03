import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../create-article/article';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from '../register/user.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  articleObj: Article = new Article();
  article_id:any;
  formEdit!: FormGroup;
  loc!: String;
  user!:UserModel
  authenticated:string=""
  
  @Input() article: Article = new Article();
  
  constructor(private location:Location, private router:Router, private apiService:ApiService, private route: ActivatedRoute){}
  ngOnInit(): void {
    this.loadArticleData();
    this.initializeUser();
  }
  
  initializeUser() {
    if (window.localStorage.getItem("authenticated") == null) {
      window.localStorage.setItem("authenticated", "false");
    }
  
    this.user = new UserModel();
    this.user.email = String(window.localStorage.getItem("email"));
    this.user.role = String(window.localStorage.getItem("role"));
    this.authenticated = String(window.localStorage.getItem("authenticated"));
  }
  
  loadArticleData() {
    this.article_id = this.route.snapshot.paramMap.get('id');

    let jwt = window.localStorage.getItem("jwt");
    this.apiService.getArticleDetails(this.article_id, String(jwt)).subscribe(
      (details) => {
        this.articleObj = details;
      },
      (error) => {
        console.error("error: ", error);
      }
    );
  
  }
  
  goBack(): void {
    this.location.back();
  }
  loadProductPage(article_id: string) {
    this.router.navigate(['/edit', article_id])
  }
  editDetails() {
    this.articleObj.id = this.article.id;
    this.formEdit.controls['title'].setValue(this.article.title);
    this.formEdit.controls['description'].setValue(this.article.description);
    this.formEdit.controls['text'].setValue(this.article.text);
    this.formEdit.controls['home_image'].setValue(this.article.home_image);
    this.formEdit.controls['detail_image'].setValue(this.article.detail_image);
  }
  
  
 
}
