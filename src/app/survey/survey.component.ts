import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Survey from 'survey-angular';
import * as $ from "jquery";

import { SurveyNavBar } from './funct/navbar';
import { SurveyAnimation } from './funct/animation';
import { SurveyKeyboardEvent } from './funct/keyevent';

import * as jsonFile from '../json/survey.json';
import { SurveyTooltip } from './funct/tooltip';

Survey.Serializer.addProperty("page", {
  name: "navigationTitle:string",
  isLocalizable: true
});
Survey.Serializer.addProperty("page", {
  name: "navigationDescription:string",
  isLocalizable: true
});

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})

export class SurveyComponent implements OnInit {
  surveyNavBar: SurveyNavBar;
  surveyAnimation: SurveyAnimation;
  surveyKeyboardEvent: SurveyKeyboardEvent;

  survey: any = null;

  constructor(
    public router: Router,
    private route: ActivatedRoute
  ) { }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.surveyKeyboardEvent.handle(event);
  }

  ngOnInit(): void {
    this.surveyNavBar = new SurveyNavBar();

    this.survey = new Survey.Model((<any>jsonFile).default);
    this.survey.onComplete.add(() => this.onSurveyComplete());
    this.survey.onCurrentPageChanged.add(() => this.onCurrentPageChanged());
    this.survey.onAfterRenderQuestion.add(() => this.doAfterRenderQuestion());
    this.survey.onUpdateQuestionCssClasses.add((survey: Survey.SurveyModel, options: any) => this.onUpdateQuestionCssClasses(survey, options));

    Survey.SurveyNG.render("surveyElement", { model: this.survey });

    (<any>window).survey = this.survey; // need for 'onclick="survey.nextPage()"'

    this.surveyAnimation = new SurveyAnimation(this.survey);
    this.surveyKeyboardEvent = new SurveyKeyboardEvent(this.survey);

    this.checkChallengeLink();
    this.onCurrentPageChanged();
  }

  insertAlternativeNextButton(): void {
    function showAlternativeNextButton() {
      $el.append('<input id="surveyNextAlternative" onclick="survey.nextPage()"' +
        ' type="button"' +
        ' value="Ok"' +
        ' class="sv_next_btn sv_next_btn--alternative">');
    }
    function hideAlternativeNextButton() {
      $("#surveyNextAlternative").remove();
    }
    function checkCheckboxes() {
      var isAnyChecked = $(".sv_q_checkbox_control_item:checked").length > 0;
      nextButtonAlreadyExists = $("#surveyNextAlternative").length > 0;
      const completeButtonExists = $('.sv_complete_btn').css('display') !== 'none';
      if (isAnyChecked && !nextButtonAlreadyExists && !completeButtonExists) {
        showAlternativeNextButton();
      }
      if (!isAnyChecked) {
        hideAlternativeNextButton();
      }
    }

    var $el = $(".sv_q.sv_qstn");
    if ($el.length > 0) {
      var nextButtonAlreadyExists = $("#surveyNextAlternative").length > 0;

      // check if there are checkboxes
      var checkboxExists = $(".sv_q_checkbox_label").length > 0;
      if (checkboxExists) {
        checkCheckboxes();
        $(".sv_q_checkbox_control_item").on("change", function () {
          checkCheckboxes();
        });
      }

      // check if there is text input
      var inputTextExists = $(".sv_q_text_root").length > 0;
      var value = $(".sv_q_text_root").val();
      if (inputTextExists) {
        if (value !== "" && !nextButtonAlreadyExists) {
          showAlternativeNextButton();
        } else if (value === "") {
          hideAlternativeNextButton();
        }
      }
    }
  }

  doAfterRenderQuestion() {
    var _this = this;
    $(".sv_q_text_root").on("keyup", function (event) {
      _this.insertAlternativeNextButton();
    });
  }

  onCurrentPageChanged() {
    $('.sv_qcbc').parent().css('display', 'flex');
    $('.sv_qcbc').parent().css('justify-content', 'center');

    this.insertAlternativeNextButton();
    this.surveyNavBar.updateNavBar(this.survey);

    SurveyTooltip.createTooltips(this.survey);
  }

  onUpdateQuestionCssClasses(survey: Survey.SurveyModel, options: any): void {
    if (options.question.name === "odkladaniePenaziVyska") {
      options.cssClasses.content += " text-input-wrapper";
      options.cssClasses.root += " currency";
    }
  }

  onSurveyComplete(): void {
    this.router.navigate(['vyhodnotenie/' + btoa(JSON.stringify(this.survey.data))]);
  }

  checkChallengeLink(): void {
    var name = this.route.snapshot.params['name'];
    var rankSimple = this.route.snapshot.params['rank'];

    if (name && rankSimple) {
      var rankPretty: string;

      if (rankSimple) {
        if (rankSimple == "FinancnaLegenda") {
          rankPretty = "Finančná legenda";
        } else if (rankSimple == "FinancnaHviezda") {
          rankPretty = "Finančná hviezda";
        } else if (rankSimple == "FinancnyKuzelnik") {
          rankPretty = "Finančný kúzelník";
        } else if (rankSimple == "FinancnyProfesor") {
          rankPretty = "Finančný profesor";
        } else if (rankSimple == "FinancnyMajster") {
          rankPretty = "Finančný majster";
        } else if (rankSimple == "FinancnyUcen") {
          rankPretty = "Finančný učeň";
        } else if (rankSimple == "FinancnyJunior") {
          rankPretty = "Finančný junior";
        } else if (rankSimple == "FinancnyNovacik") {
          rankPretty = "Finančný nováčik";
        } else if (rankSimple == "FinancnyZaciatocnik") {
          rankPretty = "Finančný začiatočník";
        } else if (rankSimple == "FinancneEmbryo") {
          rankPretty = "Finančné embryo";
        } else {
          rankPretty = "nedefinované";
        }
      }

      var titleElement = document.getElementsByClassName("sv_q_title").item(0);
      if (titleElement) {
        const challengeText = "<p>vyzíva ťa " + name + " s hodnosťou <span class='tooltip-link' data-tippy-content='test123'>" + rankPretty + "</span>, </p>";
        var innerHTML = titleElement.innerHTML;
        var indexFirst = innerHTML.indexOf("ako si želáš, aby sme Ťa oslovovali?");
        if (indexFirst >= 0) {
          titleElement.innerHTML = innerHTML.slice(0, indexFirst) + challengeText + innerHTML.slice(indexFirst);
        }
      }
    } else {
      // aj za predpokladu, ze neni challengelink, text sa rozdeli na dva riadky, vyzera to tak lepsie
      var titleElement = document.getElementsByClassName("sv_q_title").item(0);
      if (titleElement) {
        var innerHTML = titleElement.innerHTML;
        var indexFirst = innerHTML.indexOf("ako si želáš, aby sme Ťa oslovovali?");
        if (indexFirst >= 0) {
          titleElement.innerHTML = innerHTML.slice(0, indexFirst) + "<p></p>" + innerHTML.slice(indexFirst);
        }
      }
    }
  }
}
