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
      author: [''],
      image:['']
    });
  }

  createBl() {
    this.articleObj.title = this.formValue.value.title;
    this.articleObj.description = this.formValue.value.description;
    this.articleObj.author = this.formValue.value.author;
    this.articleObj.image=this.formValue.value.image;

    this.api.createArticle(this.articleObj).subscribe(
      (res) => {
        console.log('Blog created successfully:', res);
        alert('Articol creat cu succes!');
        this.formValue.reset();
      },
      (err) => {
        console.error('Error creating blog:', err);
        alert('Eroare la crearea articolului!');
      }
    );
  }

}
