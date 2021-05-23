import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', component: SurveyComponent },

  { path: 'otazky/:name/:rank', component: SurveyComponent },

  { path: 'vyhodnotenie/:base64data', component: ResultComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class RoutingModule { }
