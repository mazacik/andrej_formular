export class SurveyNavBar {
  sections: string[];
  currentSection: string;
  navbarElements;

  constructor() {
    this.sections = [
      "sekciaUvodneOtazky",
      "sekciaVyberProduktov",
      "sekciaPracaSPeniazmi",
      "sekciaFinancnaGramotnost",
      "sekciaOkruhyZaujmu"
    ];
    this.currentSection = this.sections[0];
    this.navbarElements = [];

    this.createNavBar();
  }

  createNavBar() {
    var navTopEl = document.querySelector("#surveyNavBar");
    navTopEl.className = "navigationContainer";
    var navProgBarDiv = document.createElement("div");
    navProgBarDiv.className = "navigationProgressbarDiv";
    navTopEl.appendChild(navProgBarDiv);
    var navProgBar = document.createElement("ul");
    navProgBar.className = "navigationProgressbar";
    navProgBarDiv.appendChild(navProgBar);

    for (var i = 0; i < this.sections.length; i++) {
      var liEl = document.createElement("li");
      // TODO to michal: give it variable value
      // liEl.setAttribute("style", "--count:10");
      if (this.currentSection == this.sections[i]) {
        liEl.classList.add("current");
      }
      var sekciaString = document.createElement("span");
      switch (this.sections[i]) {
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
      this.navbarElements.push(liEl);
      navProgBar.appendChild(liEl);
    }
  }

  getSectionByCurrentPage(survey) {
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
        return this.sections[0];
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
        return this.sections[1];
      case "pageSKymSaRadis":
      case "pageFinancnaRezerva":
      case "pageFinancnaRezervaVyska":
      case "pagePrehladOVydavkoch":
      case "pageOmeskanieSplatky":
        return this.sections[2];
      case "pageZaciatokGramotnosti":
      case "pageFinancnaGramotnostDlhodobaInvesticia":
      case "pageFinancnaGramotnostPoisteniePriInvestovani":
      case "pageFinancnaGramotnostDruhyPilier":
      case "pageFinancnaGramotnostVynos":
      case "pageFinancnaGramotnostByt":
        return this.sections[3];
      case "pageCoChcesVediet":
        return this.sections[4];
    }
  }

  updateNavBar(survey: any) {
    var newSection = this.getSectionByCurrentPage(survey);

    // set section name as body class name
    for (let i = 0; i < this.sections.length; i++) {
      document.getElementsByTagName("body")[0].classList.remove(this.sections[i]);
    }
    document.getElementsByTagName("body")[0].classList.add(newSection);

    // set navigation items current state
    for (let i = 0; i < this.navbarElements.length; i++) {
      this.navbarElements[i].classList.remove("current");
    }

    // TODO: sometimes newSection is undefined
    if (newSection) {
      this.navbarElements[this.sections.indexOf(newSection)].classList.add("current");
    }
  }
}

