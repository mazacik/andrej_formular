import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { ErrorComponent } from './error/error.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {path:'', component: StartComponent},
  {path:'start', component: StartComponent},

  {path:'result', component: ResultComponent},

  {path:'**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
