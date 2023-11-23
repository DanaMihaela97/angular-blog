import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { EditComponent } from './edit/edit.component';

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
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
