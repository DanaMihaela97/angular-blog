import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from './create-article/article';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url:string='http://localhost:8080/api/v1/blog'

  constructor(private http:HttpClient){}

  getArticles(): Observable<any> {
    return this.http.get<any>(`${this.url}/blogs`, { withCredentials: false });
  }

  getArticleById(id: any) {
    return this.http.get<any>("http://localhost:8080/api/v1/blog/blogs/" + id)
  }

  public createArticle(data: Article) {
    console.log(data);
    return this.http.post<Article>("http://localhost:8080/api/v1/blog/blogs/create", data, { withCredentials: true });
  }
  

 deleteArticle(id: any) {
  return this.http.delete<any>("http://localhost:8080/api/v1/blog/blogs/delete/" + id);
}

  // data=body
  updateArticle(data :any, id: any){
    console.log(data)
    return this.http.put<any>("http://localhost:8080/api/v1/blog/blogs" + id, data)
  }

}
