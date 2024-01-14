// edit.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from '../create-article/article';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  article_id: any;
  formEdit!: FormGroup;
  articleObj: Article = new Article();

  @Input() article: Article = new Article();

  constructor(private location: Location, private apiService: ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router:Router) {}

  ngOnInit(): void {
    this.formEdit = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      home_image: ['', Validators.required],
      detail_image: ['', Validators.required],
      text: ['', Validators.required],
    });

    this.loadArticleData();
  }

  loadArticleData() {
    this.article_id = this.route.snapshot.paramMap.get('id');

    let jwt = window.localStorage.getItem("jwt");
    this.apiService.getArticleDetails(this.article_id, String(jwt)).subscribe(
      (details) => {
        this.articleObj = details;
        this.editDetails(); 
      },
      (error) => {
        console.error("Nu s-au putut încărca detaliile: ", error);
      }
    );
  }

  update() {
    if (this.formEdit.valid) {
      this.articleObj.title = this.formEdit.value.title;
      this.articleObj.description = this.formEdit.value.description;
      this.articleObj.text = this.formEdit.value.text;
      this.articleObj.home_image = this.formEdit.value.home_image;
      this.articleObj.detail_image = this.formEdit.value.detail_image;

     
      let jwt = window.localStorage.getItem("jwt");
      this.apiService.updateArticle(this.articleObj, this.articleObj.id, String(jwt)).subscribe(
        (data) => {
          alert("Articolul a fost actualizat cu succes!")
          console.log('Articolul a fost actualizat cu succes!', data);
          this.router.navigate(['/blogs']);
        },
        (error) => {
          console.error('Eroare la actualizarea articolului!', error);
        }
      );
    } else {
      console.error('Formularul nu este valid!');
    }
  }
  editDetails() {
    this.formEdit.patchValue({
      title: this.articleObj.title,
      description: this.articleObj.description,
      text: this.articleObj.text,
      home_image: this.articleObj.home_image,
      detail_image: this.articleObj.detail_image,
    });
  }
  goBack(): void {
    this.location.back();
  }
  
}
