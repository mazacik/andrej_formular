import { Component, OnInit, HostListener } from '@angular/core';
import * as Survey from 'survey-angular';
import * as jsonFile from '../survey.json';
import * as $ from "jquery";

//Survey.StylesManager.applyTheme("default");
Survey.Serializer.addProperty("page", {
  name: "navigationTitle:string",
  isLocalizable: true
});
Survey.Serializer.addProperty("page", {
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
    var sections = ["sekciaUvodneOtazky", "sekciaVyberProduktov", "sekciaPracaSPeniazmi", "sekciaFinancnaGramotnost", "sekciaOkruhyZaujmu"];
    var currentSection = sections[0];

    var navbarElements = [];

    createNavBar();

    var survey = new Survey.Model((jsonFile as any).default);
    survey.onComplete.add(onSurveyComplete);
    survey.onCurrentPageChanged.add(onCurrentPageChanged);
    survey.onAfterRenderQuestion.add(doAfterRenderQuestion);

    function onCurrentPageChanged(sender, options) {
      insertAlternativeNextButton();

      for (let i = 0; i < sections.length; i++) {
        if (sections[i] == currentSection) {
          navbarElements[i].classList.remove("current");
          console.log(currentSection);
        }
      }

      updateCurrentSection();

      for (let i = 0; i < sections.length; i++) {
        const element = sections[i];

        if (element == currentSection) {
          navbarElements[i].classList.add("current");
        }
      }
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
          currentSection = sections[0];
          break;
        case "pageProduktyZivotnePoistenie":
        case "pageProduktyDruhyPilier":
        case "pageProduktyUverHypotekaPozicka":
        case "pageProduktyIneInvesticie":
        case "pageAkeAkciePlanujes":
          currentSection = sections[1];
          break;
        case "pageSKymSaRadis":
        case "pageFinancnaRezerva":
        case "pagePrehladOVydavkoch":
          currentSection = sections[2];
          break;
        case "pageFinancnaGramotnostDlhodobaInvesticia":
        case "pageFinancnaGramotnostPoisteniePriInvestovani":
        case "pageFinancnaGramotnostDruhyPilier":
        case "pageFinancnaGramotnostVynos":
        case "pageFinancnaGramotnostByt":
          currentSection = sections[3];
          break;
        case "pageCoChcesVediet":
          currentSection = sections[4];
      }
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

      for (var i = 0; i < sections.length; i++) {
        var liEl = document.createElement("li");
        if (currentSection == sections[i]) {
          liEl.classList.add("current");
        }
        var pageTitle = document.createElement("span");
        pageTitle.innerText = sections[i];
        pageTitle.className = "sectionTitle";
        liEl.appendChild(pageTitle);
        navbarElements.push(liEl);
        navProgBar.appendChild(liEl);
      }
    }

    function insertAlternativeNextButton() {
      function showAlternativeNextButton() {
        $el.append('<input id="surveyNextAlternative" onclick="survey.nextPage();"' +
          ' type="button"' +
          ' value="Next"' +
          ' class="sv_next_btn sv_next_btn--alternative">');
      }
      function hideAlternativeNextButton() {
        $("#surveyNextAlternative").remove();
      }
      function checkCheckboxes() {
        var isAnyChecked = $(".sv_q_checkbox_control_item:checked").length > 0;
        nextButtonAlreadyExists = $("#surveyNextAlternative").length > 0;
        if (isAnyChecked && !nextButtonAlreadyExists) {
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
          $(".sv_q_checkbox_control_item").on("change", function(){
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
