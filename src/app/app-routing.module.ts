import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { EditComponent } from './edit/edit.component';
import { HeaderComponent } from './header/header.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{
  path:"create",
  component:CreateArticleComponent
},
{
  path:"",
  component:ArticleListComponent
},
{
  path:"blogs",
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
  path:"login",
  component:LoginComponent
},
{
  path:"logout",
  component: LogoutComponent
},
{
  path:"register",
  component:RegisterComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
