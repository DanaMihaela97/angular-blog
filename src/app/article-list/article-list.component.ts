// article-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Article } from '../create-article/article';
import { Router } from '@angular/router';
import { UserModel } from '../register/user.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  authenticated:string=""
  loc!: String;
  user!:UserModel;
  constructor(private apiService: ApiService, private router:Router) {}

  ngOnInit() {
    this.loadArticles();
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

  loadArticles() {
    let jwt = window.localStorage.getItem("jwt");
    this.apiService.getArticles(String(jwt)).subscribe((res: Article[]) => {
      console.log(res);
      this.articles = res;
    });
  }

  deleteArticle(id: String) {
    let jwt = window.localStorage.getItem("jwt");
    this.apiService.deleteArticle(id, String(jwt)).subscribe(res => {
      alert("Articolul a fost sters cu succes.");
      this.loadArticles();
    })
  
  }
loadProductPage(article_id: string) {
  this.router.navigate(['/details', article_id])
  console.log("Am apasat pe ", article_id)
}
getPositionClass(id: string): string {
  const numericId = parseInt(id, 10); 
  return numericId % 2 === 0 ? 'even-id' : 'odd-id';
}
checkAuthentication() {
  if (this.authenticated === 'false') {
    alert('Trebuie să fii autentificat pentru a avae acces la mai multe detalii!');
    this.router.navigate(['/login']);
   
  }
}

}
