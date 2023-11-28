import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { EditComponent } from './edit/edit.component';
import { HeaderComponent } from './header/header.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
  path:"create",
  component:CreateArticleComponent
},
{
  path:"articles",
  component:ArticleListComponent
},

{
  path:"header",
  component:HeaderComponent
},
{
  path:"details/:id",
  component:DetailsComponent
},
{
  path:"edit/:id",
  component:EditComponent
},
{
  path:"",
  component:LoginComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
