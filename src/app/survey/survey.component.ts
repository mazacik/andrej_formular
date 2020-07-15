import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as Survey from 'survey-angular';
import * as jsonFile from '../json/survey.json';
import * as $ from "jquery";
import tippy from 'tippy.js';

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
  constructor(
    public router: Router
  ) { }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    var survey = (<any>window).survey;
    var key = event.key;

    if (survey != null) {
      if (survey.currentPage.questions[0].getType() == "text" && survey.currentPage.questions[0].inputType != "text") {
        // question is a text input that only allows numbers
        if (key == "Enter" || key == "ArrowRight" || key == "ArrowDown") {
          var element = document.getElementById("surveyNextAlternative");
          if (element) element.focus;
        } else if (key == "ArrowUp" || key == "ArrowLeft") {
          event.preventDefault();
          survey.prevPage();
        }
      } else {
        if (key == "Enter" || key == "ArrowRight" || key == "ArrowDown") {
          event.preventDefault();
          survey.nextPage();
        } else if (key == "ArrowUp" || key == "ArrowLeft") {
          event.preventDefault();
          survey.prevPage();
        }
      }
    }
  }

  ngOnInit(): void {
    function createNavBar() {
      var navTopEl = document.querySelector("#surveyNavBar");
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
        var sekciaString = document.createElement("span");
        switch (sections[i]) {
          case "sekciaUvodneOtazky":
            sekciaString.innerText = "Úvodné otázky";
            break;
          case "sekciaVyberProduktov":
            sekciaString.innerText = "Výber produktov";
            break;
          case "sekciaPracaSPeniazmi":
            sekciaString.innerText = "Práca s peniazmi";
            break;
          case "sekciaFinancnaGramotnost":
            sekciaString.innerText = "Finančná gramotnosť";
            break;
          case "sekciaOkruhyZaujmu":
            sekciaString.innerText = "Okruhy záujmu";
            break;
        }
        sekciaString.className = "sectionTitle";
        liEl.appendChild(sekciaString);
        navbarElements.push(liEl);
        navProgBar.appendChild(liEl);
      }
    }

    function insertAlternativeNextButton() {
      function showAlternativeNextButton() {
        $el.append('<input id="surveyNextAlternative" onclick="survey.nextPage();"' +
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

    function doAfterRenderQuestion() {
      $(".sv_q_text_root").on("keyup", function (event) {
        insertAlternativeNextButton();
      });
    }

    function onCurrentPageChanged(survey: Survey.SurveyModel, options: any) {
      // hacky ugly stuff
      // couldn't select it via css
      $('.sv_qcbc').parent().css('display', 'flex');
      $('.sv_qcbc').parent().css('justify-content', 'center');
      function updateNavBar() {
        function getSectionByCurrentPage() {
          switch (survey.currentPage.name) {
            case "pageMeno":
            case "pageZaciatokUvodnychOtazok":
            case "pageVek":
            case "pageStudium":
            case "pageZdrojPrijmu":
            case "pageVyskaPrijmu":
            case "pageNemaPrijem":
            case "pageDajteMiVediet":
            case "pageKdePracujes":
            case "pageOdkladaniePenazi":
            case "pageOdkladaniePenaziSposob":
            case "pageKdePracujes":
            case "pageOdkladaniePenazi":
            case "pageOdkladaniePenaziVyska":
              return sections[0];
            case "pageZaciatokBodovania":
            case "pageProduktyZivotnePoistenie":
            case "pageProduktyZivotnePoistenieKolkoPlati":
            case "pageProduktyZivotnePoistenieInvesticia":
            case "pageProduktyZivotnePoistenieInvesticiaVyska":
            case "pageProduktyDruhyPilier":
            case "pageProduktyTretiPilier":
            case "pageProduktyTretiPilierFondy":
            case "pageProduktyTretiPilierVyskaPrispevku":
            case "pageProduktyTretiPilierVyskaPrispevkuZamestnavatela":
            case "pageProduktyUverHypotekaPozicka":
            case "pageNajomne":
            case "pageProduktyHypotekaVyskaSplatky":
            case "pageProduktyHypotekaUrok":
            case "pageProduktyUverPozickaVyskaSplatky":
            case "pageProduktyUverPozickaUrok":
            case "pageProduktyBeznyUcet":
            case "pageProduktyInvesticieSporenia":
            case "pageZaciatokOtazokOInvestovani":
            case "pageKratkodobeInvesticie":
            case "pageDynamickeInvesticie":
            case "pageAkeInvesticiePlanujes":
              return sections[1];
            case "pageSKymSaRadis":
            case "pageFinancnaRezerva":
            case "pageFinancnaRezervaVyska":
            case "pagePrehladOVydavkoch":
            case "pageOmeskanieSplatky":
              return sections[2];
            case "pageZaciatokGramotnosti":
            case "pageFinancnaGramotnostDlhodobaInvesticia":
            case "pageFinancnaGramotnostPoisteniePriInvestovani":
            case "pageFinancnaGramotnostDruhyPilier":
            case "pageFinancnaGramotnostVynos":
            case "pageFinancnaGramotnostByt":
              return sections[3];
            case "pageCoChcesVediet":
              return sections[4];
          }
        }

        var newSection = getSectionByCurrentPage();

        // set section name as body class name
        for (let i = 0; i < sections.length; i++) {
          document.getElementsByTagName("body")[0].classList.remove(sections[i]);
        }
        document.getElementsByTagName("body")[0].classList.add(newSection);

        // set navigation items current state
        for (let i = 0; i < navbarElements.length; i++) {
          navbarElements[i].classList.remove("current");
        }

        // TODO: sometimes newSection is undefined
        if (newSection) {
          navbarElements[sections.indexOf(newSection)].classList.add("current");
        }
      }

      function createTooltip() {

      }

      if (survey) {
        var surveyCookie = {
          currentPageNo: survey.currentPageNo,
          data: survey.data
        };
        //window.sessionStorage.setItem('surveyCookie', JSON.stringify(surveyCookie));
      }

      // tooltip proof of concept
      var titleElement = document.getElementsByClassName("sv_q_title").item(0);
      if (titleElement) {
        var innerHTML = titleElement.innerHTML;

        var indexFirst = innerHTML.indexOf("priemerného");
        var indexLast = indexFirst + "priemerného".length;

        if (indexFirst >= 0) {
          innerHTML = innerHTML.slice(0, indexLast) + "</span>" + innerHTML.slice(indexLast);
          innerHTML = innerHTML.slice(0, indexFirst) + "<span class='priemerneho'>" + innerHTML.slice(indexFirst);

          titleElement.innerHTML = innerHTML;

          tippy('.priemerneho', {
            "content": "Mesačný príjem môže občas klesať alebo stúpať, preto si ho neváhaj vyrátať."
          })
        }
      }

      insertAlternativeNextButton();
      updateNavBar();
    }

    function onUpdateQuestionCssClasses(survey: Survey.SurveyModel, options: any) {
      var classes = options.cssClasses;

      if (options.question.name === "odkladaniePenaziVyska") {
        classes.content += " text-input-wrapper";
        classes.root += " currency";
      }
    }

    function tryLoadSurveyDataFromCookie(survey: Survey.Survey) {
      var surveyCookie = window.sessionStorage.getItem("surveyCookie");
      if (surveyCookie) {
        var jsonCookie = JSON.parse(surveyCookie);
        if (jsonCookie.currentPageNo) {
          survey.currentPageNo = jsonCookie.currentPageNo;
        }
        if (jsonCookie.data) {
          survey.data = jsonCookie.data;
        }
      }
    }

    var sections = ["sekciaUvodneOtazky", "sekciaVyberProduktov", "sekciaPracaSPeniazmi", "sekciaFinancnaGramotnost", "sekciaOkruhyZaujmu"];
    var currentSection = sections[0];

    var navbarElements = [];

    createNavBar();

    var survey = new Survey.Model((<any>jsonFile).default);
    survey.onComplete.add(() => this.onSurveyComplete());
    survey.onCurrentPageChanged.add(onCurrentPageChanged);
    survey.onAfterRenderQuestion.add(doAfterRenderQuestion);
    survey.onUpdateQuestionCssClasses.add(onUpdateQuestionCssClasses);

    //tryLoadSurveyDataFromCookie(survey);

    Survey.SurveyNG.render("surveyElement", { model: survey });
    (<any>window).survey = survey;

    let doAnimation = true;
    const animationSpeed = 400;
    const $toAnimate = $('.sv_body > div:first-child');
    let animateNext = false;
    survey.onCurrentPageChanging.add((sender, options) => {
      if (!doAnimation) { return; }
      options.allowChanging = false;
      animateNext = sender.currentPage.visibleIndex > options.newCurrentPage.visibleIndex;
      $('.sv_body').css('overflow', 'hidden');
      setTimeout(() => {
        doAnimation = false;
        sender.currentPage = options.newCurrentPage;
        doAnimation = true;
        $toAnimate.css('transition', 'none');
      }, animationSpeed);
      $toAnimate.css({
        transform: 'translateY(' + (animateNext ? '+' : '-') + '100vh)',
      });
    });

    survey.onCurrentPageChanged.add(sender => {
      $('.sv_body > div:first-child').css({
        transform: 'translateY(' + (animateNext ? '-' : '+') + '100vh)',
      });
      const overflows = $('#surveyNavBar').height() - (window.innerHeight / 2) + ($('.sv_row').height() / 2);
      const shift = overflows > 0 ? overflows : 0;
      setTimeout(() => {
        $toAnimate.css('transition', 'all .4s');
        $toAnimate.css({
          transform: 'translateY(' + shift + 'px)',
        });

        // hacky way to position bottom navigation
        const contentHeight = $('.sv_body > div:first-child').height() + $('#surveyNavBar').height();
        if (contentHeight > window.innerHeight) {
          $('.sv_nav').css({
            top: $('.sv_body > div:first-child').height() + $('#surveyNavBar').height(),
            bottom: 'auto',
          });
        } else {
          $('.sv_nav').css({
            top: 'auto',
            bottom: 0,
          });
        }
      }, 0);
      setTimeout(() => {
        $('.sv_body').css('overflow', 'auto');
      }, animationSpeed);
    });
  }

  onSurveyComplete(): void {
    var survey = (<any>window).survey;
    var surveyCookie = {
      currentPageNo: survey.currentPageNo,
      data: survey.data
    };

    // window.sessionStorage.removeItem('surveyCookie');
    // window.sessionStorage.setItem('surveyCookie', JSON.stringify(surveyCookie));
    var navigateTo = 'vyhodnotenie/' + btoa(JSON.stringify(survey.data));
    this.router.navigate([navigateTo]);
  }
}
