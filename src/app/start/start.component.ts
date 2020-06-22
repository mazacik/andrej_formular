import { Component, OnInit, HostListener } from '@angular/core';
import * as Survey from 'survey-angular';
import * as jsonFile from '../survey.json';
import * as $ from "jquery";

//Survey.StylesManager.applyTheme("default");
Survey
  .Serializer
  .addProperty("page", {
    name: "navigationTitle:string",
    isLocalizable: true
  });
Survey
  .Serializer
  .addProperty("page", {
    name: "navigationDescription:string",
    isLocalizable: true
  });

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
      if (key == "Enter" || key == "ArrowRight" || key == "ArrowDown") {
        event.preventDefault();
        survey.nextPage();
      } else if (key == "ArrowUp" || key == "ArrowLeft") {
        event.preventDefault();
        survey.prevPage();
      }
    }
  }



  ngOnInit(): void {
    var survey = new Survey.Model((jsonFile as any).default);
    survey.onComplete.add(onSurveyComplete);
    survey.onCurrentPageChanged.add(onCurrentPageChanged);
    survey.onAfterRenderQuestion.add(doAfterRenderQuestion);

    createNavBar();


    function onCurrentPageChanged(sender, options) {
      insertAlternativeNextButton();

      updateCurrentSection();
    }

    function updateCurrentSection() {
      switch (survey.currentPage.name) {
        case "pageVek":
        case "pageStudium":
        case "pageZdrojPrijmu":
        case "pageVyskaPrijmu":
        case "pageKdePracujes":
        case "pageOdkladaniePenazi":
        case "pageOdkladaniePenaziVyska":
        case "pageKdePracujes":
        case "pageOdkladaniePenazi":
        case "pageOdkladaniePenaziVyska":
          (<any>window).currentSection = "sekciaUvodneOtazky";
          break;
        case "pageProduktyZivotnePoistenie":
        case "pageProduktyDruhyPilier":
        case "pageProduktyUverHypotekaPozicka":
        case "pageProduktyIneInvesticie":
        case "pageAkeAkciePlanujes":
          (<any>window).currentSection = "sekciaVyberProduktov";
          break;
        case "pageSKymSaRadis":
        case "pageFinancnaRezerva":
        case "pagePrehladOVydavkoch":
          (<any>window).currentSection = "sekciaPracaSPeniazmi";
          break;
        case "pageFinancnaGramotnostDlhodobaInvesticia":
        case "pageFinancnaGramotnostPoisteniePriInvestovani":
        case "pageFinancnaGramotnostDruhyPilier":
        case "pageFinancnaGramotnostVynos":
        case "pageFinancnaGramotnostByt":
          (<any>window).currentSection = "sekciaFinancnaGramotnost";
          break;
        case "pageCoChcesVediet":
          (<any>window).currentSection = "sekciaOkruhyZaujmu";
      }

      document.getElementById("sectionElement").innerHTML = (<any>window).currentSection;
    }

    function createNavBar() {
      var navTopEl = document.querySelector("#surveyNavigationTop");
      navTopEl.className = "navigationContainer";
      var navProgBarDiv = document.createElement("div");
      navProgBarDiv.className = "navigationProgressbarDiv";
      navTopEl.appendChild(navProgBarDiv);
      var navProgBar = document.createElement("ul");
      navProgBar.className = "navigationProgressbar";
      navProgBarDiv.appendChild(navProgBar);
      var liEls = [];
      for (var i = 0; i < survey.visiblePageCount; i++) {
        var liEl = document.createElement("li");
        if (survey.currentPageNo == i) {
          liEl.classList.add("current");
        }
        liEl.onclick = function (index) {
          return function () {
            if (survey['isCompleted'])
              return;
            liEls[survey.currentPageNo].classList.remove("current");
            if (index < survey.currentPageNo) {
              survey.currentPageNo = index;
            } else if (index > survey.currentPageNo) {
              var j = survey.currentPageNo;
              for (; j < index; j++) {
                if (survey.visiblePages[j].hasErrors(true, true))
                  break;
                if (!liEls[j].classList.contains("completed")) {
                  liEls[j]
                    .classList
                    .add("completed");
                }
              }
              survey.currentPageNo = j;
            }
            liEls[survey.currentPageNo].classList.add("current");
          };
        }(i);
        var pageTitle = document.createElement("span");
        if (!(<any>survey.visiblePages[i]).navigationTitle) {
          pageTitle.innerText = survey.visiblePages[i].name;
        } else
          pageTitle.innerText = (<any>survey.visiblePages[i]).navigationTitle
        pageTitle.className = "pageTitle";
        liEl.appendChild(pageTitle);
        var br = document.createElement("br");
        liEl.appendChild(br);
        var pageDescription = document.createElement("span");
        if (!!(<any>survey.visiblePages[i]).navigationTitle) {
          pageDescription.innerText = (<any>survey.visiblePages[i]).navigationTitle
        }
        pageDescription.className = "pageDescription";
        liEl.appendChild(pageDescription);
        liEls.push(liEl);
        navProgBar.appendChild(liEl);
      }
    }

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
