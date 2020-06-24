import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { ErrorComponent } from './error/error.component';
import { ResultComponent } from './result/result.component';
import { IntroComponent } from './intro/intro.component';

const routes: Routes = [
  {path:'', component: IntroComponent},
  {path:'intro', component: IntroComponent},
  {path:'survey', component: SurveyComponent},
  {path:'result', component: ResultComponent},
  {path:'**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
