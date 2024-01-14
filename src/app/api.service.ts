import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Article } from './create-article/article';
import { UserModel } from './register/user.model';
import { userRequest } from './userRequest';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isLogged: boolean = false;
  user!: UserModel;
  private apiUrl = 'http://localhost:8080/api/v1/blog/';

  constructor(private http: HttpClient) { }

  // articole
  getArticles(jwt: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      
    });
    return this.http.get<[Article]>("http://localhost:8080/api/v1/blog/blogs", { headers })

  }
  getArticleById(id: any, jwt: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.get<Article>("http://localhost:8080/api/v1/blog/blogs/" + id, { headers })
  }
  
  createArticle(data: Article, jwt: string): Observable<Article> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    });
    return this.http.post<Article>(this.apiUrl + 'blogs', data, { headers });
  }
 
  deleteArticle(id: any, jwt: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.delete<any>("http://localhost:8080/api/v1/blog/blogs/" + id, { headers })
  }
  updateArticle(data: any, article_id: any, jwt: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.put<Article>("http://localhost:8080/api/v1/blog/blogs/" + article_id, data, { headers })
  }
  getArticleDetails(article_id: any, jwt: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.get<Article>("http://localhost:8080/api/v1/blog/blogs/" + article_id, { headers });
  }

  //user
  public createUser(user: UserModel) {
    return this.http.post<any>("http://localhost:8080/api/v1/auth/register", user)
  }

  public signIn(user: userRequest) {
    return this.http.post<any>("http://localhost:8080/api/v1/auth/authenticate", user)
  }
  public setUser(user: UserModel) {
    this.user = user
  }
  public getUser(username: String) {
    return this.http.get<any>("http://localhost:8080/api/v1/blog/users/" + username);
  }

}