// create-article.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { Article } from './article';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent {
  formValue!: FormGroup;
  articleObj: Article = new Article();

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      title: [''],
      description: [''],
      home_image:[''],
      detail_image:[''],
      text:['']
    });
  }

  createBl() {
    this.articleObj.title = this.formValue.value.title;
    this.articleObj.description = this.formValue.value.description;
    this.articleObj.home_image=this.formValue.value.home_image;
    this.articleObj.detail_image=this.formValue.value.detail_image;
    this.articleObj.text=this.formValue.value.text;

    let jwt = window.localStorage.getItem("jwt");
    this.api.createArticle(this.articleObj, String(jwt)).subscribe(
      (res) => {
        console.log('Articol creat cu succes:', res);
        alert('Articol creat cu succes!');
        this.formValue.reset();
      },
      (err) => {
        console.error('Eroare la crearea articolului:', err);
        alert('Eroare la crearea articolului!');
      }
    );
  }
  

}
