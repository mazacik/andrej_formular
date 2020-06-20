import { Component, OnInit } from '@angular/core';
import * as Survey from 'survey-angular';
import * as jsonFile from '../survey.json';

//Survey.StylesManager.applyTheme("default");

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})

export class StartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var survey = new Survey.Model((jsonFile as any).default);
    survey.onComplete.add(sendDataToServer);

    // survey.onUpdateQuestionCssClasses.add(function(survey, options) {
    //   var classes = options.cssClasses;

    //   if (options.question.getType() === "matrix") {
    //     classes.root = classes.root  + " custom-matrix";
    //   }
    // });

    Survey.SurveyNG.render("surveyElement", { model: survey });
  }

}

function sendDataToServer(survey) {
  //send (Ajax) request to your web server.
  alert("The results are:" + JSON.stringify(survey.data));
}
