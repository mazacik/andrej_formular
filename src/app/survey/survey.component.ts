import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Survey from 'survey-angular';

import { AnimationHelper } from './helper/animation.helper';

import * as surveyJson from '../json/survey';
import { SurveyTooltip } from './helper/tooltip';

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
  public survey: Survey.SurveyModel;

  constructor(
    public router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.survey = new Survey.Model(surveyJson.default);
    this.survey.onComplete.add(() => this.onSurveyComplete());
    this.survey.onValueChanging.add((survey: Survey.SurveyModel, options: any) => this.tryGoNextPageAutomatic(survey, options));
    this.survey.onValueChanged.add((survey: Survey.SurveyModel, options: any) => this.onValueChanged(survey, options));
    this.survey.onCurrentPageChanging.add((survey: Survey.SurveyModel, options: any) => this.onCurrentPageChanging(survey, options));
    this.survey.onCurrentPageChanged.add((survey: Survey.SurveyModel, options: any) => this.onCurrentPageChanged(survey, options));
    this.survey.onUpdateQuestionCssClasses.add((survey: Survey.SurveyModel, options: any) => this.onUpdateQuestionCssClasses(survey, options));
    Survey.SurveyNG.render("surveyElement", { model: this.survey });

    this.checkChallengeLink();
    this.onCurrentPageChanged(this.survey);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
      case 'ArrowRight':
      case 'ArrowDown':
        this.nextPage();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        this.survey.prevPage();
        break;
    }
  }

  nextPage(): void {
    if (this.survey.isLastPage) {
      this.survey.completeLastPage();
    } else {
      this.survey.nextPage();
    }
  }

  isLastPage: boolean = false;

  onValueChanged(survey: Survey.SurveyModel, options: any): void {
    if (options.question.getType() == "checkbox") {
      this.processPageCountChange();
    }
  }

  onCurrentPageChanging(survey: Survey.SurveyModel, options?: any) {
    AnimationHelper.onCurrentPageChanging(survey, options);
  }

  onCurrentPageChanged(survey: Survey.SurveyModel, options?: any) {
    if (options) AnimationHelper.onCurrentPageChanged(options.isNextPage);

    this.processPageCountChange();

    SurveyTooltip.createTooltips(survey);
  }

  processPageCountChange(): void {
    this.isLastPage = this.survey.currentPageNo + 1 == this.survey.visiblePageCount;
    this.cdr.detectChanges();
    console.log(this.isLastPage);

    document.getElementById('btn_next_text').innerText = this.isLastPage ? 'Dokončiť' : 'Ďalej';

    let progress: number = (this.survey.currentPageNo + 1) / this.survey.visiblePageCount * 100;
    $('.sv_progress_bar').width(progress + '%');
  }

  tryGoNextPageAutomatic(survey: Survey.SurveyModel, options: any): void {
    if (options.value && options.question.getType() == "radiogroup") {
      setTimeout(() => this.nextPage(), 100);
    }
  }

  onUpdateQuestionCssClasses(survey: Survey.SurveyModel, options: any): void {
    if (options.question.inputType == "number") {
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
