import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { EditComponent } from './edit/edit.component';
import { HeaderComponent } from './header/header.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [{
  path:"create",
  component:CreateArticleComponent
},
{
  path:"articles",
  component:ArticleListComponent
},
{
  path:"edit",
  component:EditComponent
},
{
  path:"header",
  component:HeaderComponent
},
{
  path:"details",
  component:DetailsComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
