export class SurveyNavBar {
  //TODO pred finalnou verziu treba ocekovat, ci tu su vsetky pages z survey.json
  sekcie = [
    {
      simple: "sekciaUvodneOtazky",
      pretty: "Úvodné otázky",
      pages: [
        "pageMeno",
        "pageZaciatokUvodnychOtazok",
        "pageVek",
        "pageStudium",
        "pageZdrojPrijmu",
        "pageNemaPrijem",
        "pageVyskaPrijmu",
        "pageKdePracujes",
        "pageOdkladaniePenazi",
        "pageOdkladaniePenaziSposob",
        "pageOdkladaniePenaziVyska",
      ]
    },
    {
      simple: "sekciaVyberProduktov",
      pretty: "Výber produktov",
      pages: [
        "pageZaciatokBodovania",
        "pageProduktyDruhyPilier",
        "pageProduktyDruhyPilierFondy",
        "pageProduktyTretiPilier",
        "pageProduktyTretiPilierFondy",
        "pageProduktyTretiPilierVyskaPrispevku",
        "pageProduktyTretiPilierVyskaPrispevkuZamestnavatela",
        "pageProduktyZivotnePoistenie",
        "pageProduktyZivotnePoistenieKolkoPlati",
        "pageProduktyZivotnePoistenieInvesticia",
        "pageProduktyZivotnePoistenieInvesticiaVyska",
        "pageProduktyUverHypotekaPozicka",
        "pageNajomne",
        "pageProduktyHypotekaVyskaSplatky",
        "pageProduktyHypotekaUrok",
        "pageProduktyUverPozickaVyskaSplatky",
        "pageProduktyUverPozickaUrok",
        "pageProduktyBeznyUcet",
        "pageProduktyInvesticie",
        "pageZaciatokOtazokOInvestovani",
        "pageKratkodobeInvesticie",
        "pageDynamickeInvesticie",
        "pageAkeInvesticiePlanujes"
      ]
    },
    {
      simple: "sekciaPracaSPeniazmi",
      pretty: "Práca s peniazmi",
      pages: [
        "pageSKymSaRadis",
        "pageOmeskanieSplatky",
        "pageFinancnaRezerva",
        "pageFinancnaRezervaVyska",
        "pagePrehladOVydavkoch"
      ]
    },
    {
      simple: "sekciaFinancnaGramotnost",
      pretty: "Finančná gramotnosť",
      pages: [
        "pageZaciatokGramotnosti",
        "pageFinancnaGramotnostDlhodobaInvesticia",
        "pageFinancnaGramotnostPoisteniePriInvestovani",
        "pageFinancnaGramotnostDruhyPilier",
        "pageFinancnaGramotnostVynos",
        "pageFinancnaGramotnostByt"
      ]
    },
    {
      simple: "sekciaOkruhyZaujmu",
      pretty: "Okruhy záujmu",
      pages: [
        "pageCoChcesVediet"
      ]
    }
  ];

  sekciaAktualna = this.sekcie[0];
  navbarElements = [];

  constructor() {
    // this.createNavBar();
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

    for (var i = 0; i < this.sekcie.length; i++) {
      var liEl = document.createElement("li");
      liEl.setAttribute("style", "--count:0");
      if (this.sekciaAktualna == this.sekcie[i]) {
        liEl.classList.add("current");
      }
      var sekciaString = document.createElement("span");
      sekciaString.innerText = this.sekcie[i].pretty;
      sekciaString.className = "sectionTitle";
      liEl.appendChild(sekciaString);
      this.navbarElements.push(liEl);
      navProgBar.appendChild(liEl);
    }
  }

  getSectionByPageName(pageName) {
    for (let i = 0; i < this.sekcie.length; i++) {
      const sekcia = this.sekcie[i];
      if (sekcia.pages.indexOf(pageName) != -1) {
        return sekcia;
      }
    }

    alert("error: (navbar.ts): " + pageName + " sa nenachadza v ziadnej sekcii");
    console.log("error: (navbar.ts): " + pageName + " sa nenachadza v ziadnej sekcii");
    return this.sekcie[0];
  }

  updateNavBar(survey: any) {
    const pageName = survey.currentPage.name;
    const section = this.getSectionByPageName(pageName);
    const sectionIndex = this.sekcie.indexOf(section);
    var navNumber = 0;

    // set navigation items current state
    for (let i = 0; i < this.navbarElements.length; i++)
      this.navbarElements[i].classList.remove("current");
    this.navbarElements[this.sekcie.indexOf(section)].classList.add("current");

    // update number in nav circle
    for (let i = 0; i < this.navbarElements.length; i++) {
      if (sectionIndex < i) {
        navNumber = this.sekcie[i].pages.length;
      } else if (sectionIndex > i) {
        navNumber = 0;
      } else {
        const currentPageIndex = this.sekcie[i].pages.indexOf(pageName);
        navNumber = this.sekcie[i].pages.length - currentPageIndex;
      }
      this.navbarElements[i].setAttribute("style", "--count:" + navNumber);
    }
  }
}
