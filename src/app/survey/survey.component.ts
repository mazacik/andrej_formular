import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Survey from 'survey-angular';

import { SurveyNavBar } from './funct/navbar';
import { SurveyAnimation } from './funct/animation';
import { SurveyKeyboardEvent } from './funct/keyevent';

import * as surveyJson from '../json/survey';
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
  styleUrls: ['./survey.component.scss'],
})

export class SurveyComponent implements OnInit {
  surveyNavBar: SurveyNavBar;
  surveyAnimation: SurveyAnimation;
  surveyKeyboardEvent: SurveyKeyboardEvent;

  survey: Survey.SurveyModel = null;

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

    this.survey = new Survey.Model(surveyJson.default);
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
      $el.last().append('<input id="surveyNextAlternative" onclick="survey.nextPage()"' +
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
    // this.surveyNavBar.updateNavBar(this.survey);

    this.updateNavButtons();

    SurveyTooltip.createTooltips(this.survey);
  }

  updateNavButtons() {
    if (this.survey.isFirstPage) {
      document.getElementById('surveyPrev').classList.add('display-none');
      document.getElementById('surveyNext').classList.remove('display-none');
      document.getElementById('surveyComplete').classList.add('display-none');
    } else if (this.survey.isLastPage) {
      document.getElementById('surveyPrev').classList.remove('display-none');
      document.getElementById('surveyNext').classList.add('display-none');
      document.getElementById('surveyComplete').classList.remove('display-none');
    } else {
      document.getElementById('surveyPrev').classList.remove('display-none');
      document.getElementById('surveyNext').classList.remove('display-none');
      document.getElementById('surveyComplete').classList.add('display-none');
    }
  }

  onUpdateQuestionCssClasses(survey: Survey.SurveyModel, options: any): void {
    if (options.question.name === "odkladaniePenaziVyska") {
      options.cssClasses.content += " text-input-wrapper";
      options.cssClasses.root += " currency";
    }
  }

  onSurveyComplete(): void {
    // remove section class from body (removes background image)
    var poslednaSekcia = this.surveyNavBar.sekcie[this.surveyNavBar.sekcie.length - 1];
    document.getElementsByTagName("body")[0].classList.remove(poslednaSekcia.simple);

    // navigate to result
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
        const challengeText = "<p>vyzýva Ťa " + name + " s hodnosťou <span class='tooltip-link' data-tippy-content='Úspešnosť Úroveň<br><br>91% - 100%        Finančná Legenda<br>81% - 90% Finančná hviezda<br>71% - 80% Finančný kúzelník <br>11% - 70% Finančný profesor<br>51% - 60% Finančný majster<br>41% - 50% Finančný učeň<br>31% - 40% Finančný junior <br>21% - 30% Finančný nováčik<br>11% - 20% Finančný začiatočník<br>0% - 10% Finančné embryo'>" + rankPretty + "</span>, </p>";
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
