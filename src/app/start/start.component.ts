import { Component, OnInit, HostListener } from '@angular/core';
import * as Survey from 'survey-angular';
import * as jsonFile from '../survey.json';
import * as $ from "jquery";

//Survey.StylesManager.applyTheme("default");

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})

export class StartComponent implements OnInit {

  constructor() { }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    var survey = (<any>window).survey;
    var key = event.key;

    if (survey != null) {
      event.preventDefault();

      if (key == "Enter" || key == "ArrowRight" || key == "ArrowDown") {
        survey.nextPage();
      } else if (key == "ArrowUp" || key == "ArrowLeft") {
        survey.prevPage();
      }
    }
  }

  ngOnInit(): void {
    var survey = new Survey.Model((jsonFile as any).default);
    survey.onComplete.add(onSurveyComplete);
    survey.onCurrentPageChanged.add(insertAlternativeNextButton);
    survey.onAfterRenderQuestion.add(doAfterRenderQuestion);

    function insertAlternativeNextButton() {
      var $el = $(".sv_q_text_root");
      if ($el.length > 0) {
        $el = $($el[0]);
        var value = $el.val();
        var nextButtonAlreadyExists = $("#surveyNextAlternative").length > 0;
        if (value != "" && !nextButtonAlreadyExists) {
          $el.after('<input id="surveyNextAlternative" onclick="survey.nextPage();" type="button" value="Next" class="sv_next_btn sv_next_btn--alternative">')
        } else if (value == "") {
          $("#surveyNextAlternative").remove();
        }
      }
    }

    function doAfterRenderQuestion(survey) {
      $(".sv_q_text_root").on("keyup", function (event) {
        insertAlternativeNextButton();
      });
    }

    Survey.SurveyNG.render("surveyElement", { model: survey });
    (<any>window).survey = survey;
  }

  manuallyCompleteSurvey() {
    // document.getElementById("surveyContainer").hidden = true;
    // document.getElementById("btnCompleteSurvey").hidden = true;
    // document.getElementById("resultContainer").removeAttribute("hidden");
  }

}

function onSurveyComplete(survey) {
  
}
