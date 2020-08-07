import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { ErrorComponent } from './error/error.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {path:'', component: SurveyComponent},

  {path:'otazky/:name/:rank', component: SurveyComponent},
  
  {path:'vyhodnotenie/:base64data', component: ResultComponent},
  
  {path:'**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
