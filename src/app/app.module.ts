import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SurveyComponent } from './survey/survey.component';
import { ErrorComponent } from './error/error.component';
import { ResultComponent } from './result/result.component';
import { IntroComponent } from './intro/intro.component';
import { ToggleTextComponent } from './toggle-text/toggle-text.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    ErrorComponent,
    ResultComponent,
    IntroComponent,
    ToggleTextComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
