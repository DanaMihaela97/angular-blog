// article-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Article } from '../create-article/article';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { ro } from 'date-fns/locale';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];

  constructor(private apiService: ApiService, private router:Router) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.apiService.getArticles().subscribe((articles: Article[]) => {
      this.articles = articles;
    });
  }

  deleteArticle(id: String) {
    this.apiService.deleteArticle(id).subscribe(res => {
      alert("Articolul a fost sters cu succes.");
      this.loadArticles();
    })
  
  }
  
  formatDateTime(dateString: string): string {
    const parsedDate = parseISO(dateString);
    const formattedDate = format(parsedDate, "dd MMM yyyy HH:mm:ss", { locale: ro });
    return formattedDate;
}
loadProductPage(article_id: string) {
  this.router.navigate(['/details', article_id])
  console.log("Am apasat pe ", article_id)
}
getPositionClass(id: string): string {
  const numericId = parseInt(id, 10); 
  return numericId % 2 === 0 ? 'even-id' : 'odd-id';
}


}
