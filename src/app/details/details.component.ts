import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../create-article/article';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  articleObj: Article = new Article();
  article_id:any;
  formEdit!: FormGroup;
  @Input() article: Article = new Article();
  
  constructor(private location:Location, private router:Router,private formBuilder: FormBuilder, private apiService:ApiService, private route: ActivatedRoute){}
  ngOnInit(): void 
  {

    this.loadArticleData();
  
  }
  loadArticleData() {
    this.article_id = this.route.snapshot.paramMap.get('id');

    this.apiService.getArticleDetails(this.article_id).subscribe(
      (details) => {
        this.articleObj = details;
      },
      (error) => {
        console.error("error loading article details: ", error);
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
