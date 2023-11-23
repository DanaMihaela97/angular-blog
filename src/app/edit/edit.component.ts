import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  articleId: number | undefined;
  article: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  // ngOnInit() {
  //   this.articleId = +this.route.snapshot.paramMap.get('id');
  //   this.loadArticle();
  // }

  // loadArticle() {
  //   this.apiService.getArticles(this.articleId).subscribe(article => {
  //     this.article = article;
  //   });
  // }

  // saveChanges() {
  //   this.apiService.editArticle(this.article, this.article).subscribe(() => {
  //     // Poți să redirecționezi utilizatorul sau să faci orice altă acțiune aici
  //   });
  // }

}
