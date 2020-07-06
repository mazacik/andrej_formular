import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as Chart from 'chart.js';

import * as questionDetails from '../json/questionDetails.json';
import * as answerDetails from '../json/answerDetails.json';
import * as naj3Order from '../json/naj3Order.json';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  data: any;

  pocetBodovMax: number = 0;
  pocetBodovStratil: number = 0;
  pocetBodovGramotnostMax: number = 0;
  pocetBodovGramotnostStratil: number = 0;
  pocetBodovHodnost: string = "nedefinované";

  percentil: number = 0;
  percentilGramotnost: number = 0;

  challengeLink: string = "error";

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // nacitaj data
    var base64data = this.route.snapshot.params['base64data'];
    if (base64data) {
      // URL
      this.data = JSON.parse(atob(base64data));
    }

    if (!this.data) {
      this.data = '{"meno": ""}'; // prevents console error
      this.router.navigate(['intro']);
    } else {
      // cyklus hlada zhodu ID vybratej odpovede a ID HTML elementu
      for (var value in this.data) {
        var answer = this.data[value];
        if (typeof answer == 'string') {
          this.resolveAnswer(answer);
        } else {
          for (let i = 0; i < answer.length; i++) {
            this.resolveAnswer(answer[i]);
          }
        }
      }

      // pole pre naj3 manualne
      var naj3Extra = [];

      // odlozit50percentprijmu
      if (this.data.odkladaniePenaziVyska >= this.data.vyskaPrijmu * 0.5) {
        const pocetBodovMax = 1;
        const pocetBodovStratil = 0;

        this.pocetBodovMax += pocetBodovMax;
        this.pocetBodovStratil += pocetBodovStratil;

        naj3Extra[naj3Extra.length] = 'naj_odlozit50percentprijmu';

        this.showElementsByClass("odlozit50percentprijmu");

        var spanPoints = document.getElementById("odlozit50percentprijmuPoints");
        if (spanPoints) spanPoints.innerHTML = "[-" + pocetBodovStratil + "b] ";
      }

      // vyskarezervy5nasobokprijmu
      if (this.data.financnaRezervaVyska >= this.data.vyskaPrijmu * 5) {
        const pocetBodovMax = 1;
        const pocetBodovStratil = 0;

        this.pocetBodovMax += pocetBodovMax;
        this.pocetBodovStratil += pocetBodovStratil;

        naj3Extra[naj3Extra.length] = 'naj_vyskarezervy5nasobokprijmu';

        this.showElementsByClass("vyskarezervy5nasobokprijmu");

        var spanPoints = document.getElementById("vyskarezervy5nasobokprijmuPoints");
        if (spanPoints) spanPoints.innerHTML = "[-" + pocetBodovStratil + "b] ";
      }

      // mesacnarezerva30percentprijmu
      if (this.data.financnaRezervaMesacne >= this.data.vyskaPrijmu * 0.3) {
        const pocetBodovMax = 1;
        const pocetBodovStratil = 0;

        this.pocetBodovMax += pocetBodovMax;
        this.pocetBodovStratil += pocetBodovStratil;

        naj3Extra[naj3Extra.length] = 'naj_mesacnarezerva30percentprijmu';

        this.showElementsByClass("mesacnarezerva30percentprijmu");

        var spanPoints = document.getElementById("mesacnarezerva30percentprijmuPoints");
        if (spanPoints) spanPoints.innerHTML = "[-" + pocetBodovStratil + "b] ";
      }

      // top 3 najlepsie
      var najlepsiePocet = 0;
      for (let i = 0; i < naj3Order.najlepsie.length; i++) {
        if (najlepsiePocet == 3) break;
        const entry = naj3Order.najlepsie[i];
        var found = false;
        for (let j = 0; j < naj3Extra.length; j++) {
          const extra = naj3Extra[j];
          if (entry == extra) {
            this.showElementsByClass(entry);
            found = true;
            najlepsiePocet++;
            break;
          }
        }

        if (!found) {
          for (var value in this.data) {
            var answer = this.data[value];
            if (typeof answer == 'string') {
              if (entry.endsWith(answer)) {
                this.showElementsByClass(entry);
                found = true;
                najlepsiePocet++;
                break;
              }
            }
          }
        }
      }

      // top 3 najhorsie
      var najhorsiePocet = 0;
      for (let i = 0; i < naj3Order.najhorsie.length; i++) {
        if (najhorsiePocet == 3) break;
        const entry = naj3Order.najhorsie[i];
        var found = false;
        for (let j = 0; j < naj3Extra.length; j++) {
          const extra = naj3Extra[j];
          if (entry == extra) {
            this.showElementsByClass(entry);
            found = true;
            najhorsiePocet++;
            break;
          }
        }

        if (!found) {
          for (var value in this.data) {
            var answer = this.data[value];
            if (typeof answer == 'string') {
              if (entry.endsWith(answer)) {
                this.showElementsByClass(entry);
                found = true;
                najhorsiePocet++;
                break;
              }
            }
          }
        }
      }

      // nasi odbornici
      this.createToggleElement("ktoSuNasiOdbornici", "Kto sú naši odborníci?",
        "Karolína Lehocká za dôchodky → Učiteľka dôchodkového systému<br>" +
        "Ondrej Broska za investície → Riaditeľ spoločnosti TowerFinance<br>" +
        "Marián Markech za poistenia → Bývalý generálny riaditeľ Axa<br>" +
        "Martin Kraus za hypotéky → Bývalý Teamleader v prvej stavebnej sporiteľni<br>" +
        "Andrej Nejedlík za komunikáciu s klientami → autor projektu");

      // dozvies sa viac o
      var dozviesSaViacO = "Viac o ";
      var stringy = [];
      if (this.data.coChcesVediet) {
        for (let i = 0; i < this.data.coChcesVediet.length; i++) {
          const entry = this.data.coChcesVediet[i];
          switch (entry) {
            case "coChcesVedietInvestovanie":
              stringy[stringy.length] = "investovaní";
              break;
            case "coChcesVedietIdealneRoznozenie":
              stringy[stringy.length] = "ideálnom rozložení";
              break;
            case "coChcesVedietVlastneByvanie":
              stringy[stringy.length] = "vlastnom bývaní";
              break;
            case "coChcesVedietFinancnaNezavislost":
              stringy[stringy.length] = "finančnej nezávislosti";
              break;
            case "coChcesVedietBenefityOdStatu":
              stringy[stringy.length] = "benefitoch od štátu";
              break;
            case "coChcesVedietMenezovanieVydavkov":
              stringy[stringy.length] = "menežovaní výdavkov";
              break;
          }
        }
      }
      for (let i = 0; i < stringy.length; i++) {
        if (i == stringy.length - 1) {
          dozviesSaViacO += " a ";
        } else if (i != 0) {
          dozviesSaViacO += ", ";
        }
        const entry = stringy[i];
        dozviesSaViacO += entry;
      }
      dozviesSaViacO += ".";

      document.getElementById("dozviesSaViacO").innerHTML = dozviesSaViacO;

      // challengeLink
      this.challengeLink = window.location.origin + "/intro/" + this.data.meno + "/" + this.calculateHodnost();

      // percentil financnej gramotnosti (vseobecny percentil je rieseny v 'calculateHodnost()' ^^^^^)
      var pocetBodovGramotnost = (this.pocetBodovGramotnostMax - this.pocetBodovGramotnostStratil) / this.pocetBodovGramotnostMax * 100;
      if (pocetBodovGramotnost > 90) {
        this.percentilGramotnost = 100;
      } else if (pocetBodovGramotnost > 80) {
        this.percentilGramotnost = 95;
      } else if (pocetBodovGramotnost > 70) {
        this.percentilGramotnost = 88;
      } else if (pocetBodovGramotnost > 60) {
        this.percentilGramotnost = 77;
      } else if (pocetBodovGramotnost > 50) {
        this.percentilGramotnost = 67;
      } else if (pocetBodovGramotnost > 40) {
        this.percentilGramotnost = 53;
      } else if (pocetBodovGramotnost > 30) {
        this.percentilGramotnost = 43;
      } else if (pocetBodovGramotnost > 20) {
        this.percentilGramotnost = 28;
      } else if (pocetBodovGramotnost > 10) {
        this.percentilGramotnost = 12;
      } else if (pocetBodovGramotnost > 0) {
        this.percentilGramotnost = 5;
      }

      // grafy
      var vyskaPrijmu = this.data.vyskaPrijmu;

      var investicieKratkobe = 0;
      if (this.data.konzervativneInvesticie) {
        for (let i = 0; i < this.data.konzervativneInvesticie.length; i++) {
          const entry = this.data.konzervativneInvesticie[i];
          if (entry.frekvenciaMesacneHodnota) {
            investicieKratkobe += entry.frekvenciaMesacneHodnota;
          } else if (entry.frekvenciaNepravidelneHodnota) {
            investicieKratkobe += entry.frekvenciaNepravidelneHodnota / 6;
          }
        }
      }
      investicieKratkobe += this.data.financnaRezervaMesacne;

      var investicieDlhodobe = 0;
      if (this.data.dynamickeInvesticie) {
        for (let i = 0; i < this.data.dynamickeInvesticie.length; i++) {
          const entry = this.data.dynamickeInvesticie[i];
          if (entry.dynamickeInvesticiefrekvenciaMesacneHodnota) {
            investicieDlhodobe += entry.dynamickeInvesticiefrekvenciaMesacneHodnota;
          } else if (entry.dynamickeInvesticiefrekvenciaNepravidelneHodnota) {
            investicieDlhodobe += entry.dynamickeInvesticiefrekvenciaNepravidelneHodnota / 6;
          }
        }
      }

      var pasiva = 0;
      if (this.data.produktyHypotekaVyskaSplatky) pasiva += this.data.produktyHypotekaVyskaSplatky;
      if (this.data.produktyUverPozickaVyskaSplatky) pasiva += this.data.produktyUverPozickaVyskaSplatky;

      var poistenie = 0;
      if (this.data.produktyZivotnePoistenieKolkoPlati) pasiva += this.data.produktyZivotnePoistenieKolkoPlati;
      if (this.data.produktyZivotnePoistenieInvesticiaVyska) pasiva -= this.data.produktyZivotnePoistenieInvesticiaVyska;

      var spotreba = vyskaPrijmu - investicieKratkobe - investicieDlhodobe - pasiva - poistenie;

      new Chart("graf-vyplneny", {
        type: 'pie',
        data: {
          labels: ['Krátkodobé investície', 'Dlhodobé investície', 'Poistenie', 'Pasíva', 'Spotreba'],
          datasets: [{
            label: '# of Votes',
            data: [investicieKratkobe, investicieDlhodobe, poistenie, pasiva, spotreba],
            backgroundColor: [
              'rgba(59, 48, 27, 1)',
              'rgba(207, 67, 39, 1)',
              'rgba(255, 255, 255, 1)',
              'rgba(46, 196, 182, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderColor: [
              'rgba(59, 48, 27, 1)',
              'rgba(207, 67, 39, 1)',
              'rgba(255, 255, 255, 1)',
              'rgba(46, 196, 182)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 2
          }]
        },
        options: {
          maintainAspectRatio: false
        }
      });
      // idealne rozlozenie graf
      new Chart("graf-idealny", {
        type: 'pie',
        data: {
          labels: ['Krátkodobé investície', 'Dlhodobé investície', 'Poistenie', 'Pasíva', 'Spotreba'],
          datasets: [{
            label: '# of Votes',
            data: [
              10 / 100 * vyskaPrijmu,
              15 / 100 * vyskaPrijmu,
              4 / 100 * vyskaPrijmu,
              30 / 100 * vyskaPrijmu,
              41 / 100 * vyskaPrijmu
            ],
            backgroundColor: [
              'rgba(59, 48, 27, 1)',
              'rgba(207, 67, 39, 1)',
              'rgba(255, 255, 255, 1)',
              'rgba(46, 196, 182, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderColor: [
              'rgba(59, 48, 27, 1)',
              'rgba(207, 67, 39, 1)',
              'rgba(255, 255, 255, 1)',
              'rgba(46, 196, 182)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 2
          }]
        },
        options: {
          maintainAspectRatio: false
        }
      });
      
      // idealne rozlozenie graf
      new Chart("graf-idealny", {
        type: 'pie',
        data: {
          labels: ['Krátkodobé investície', 'Dlhodobé investície', 'Poistenie', 'Pasíva', 'Spotreba'],
          datasets: [{
            label: '# of Votes',
            data: [
              10 / 100 * vyskaPrijmu,
              15 / 100 * vyskaPrijmu,
              4 / 100 * vyskaPrijmu,
              30 / 100 * vyskaPrijmu,
              41 / 100 * vyskaPrijmu
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          maintainAspectRatio: false
        }
      });
    }
  }

  calculateHodnost(): string {
    var pocetBodovPercent = (this.pocetBodovMax - this.pocetBodovStratil) / this.pocetBodovMax * 100;
    if (pocetBodovPercent > 90) {
      this.pocetBodovHodnost = "Finančná legenda";
      this.percentil = 100;
      return "FinancnaLegenda";
    } else if (pocetBodovPercent > 80) {
      this.pocetBodovHodnost = "Finančná hviezda";
      this.percentil = 95;
      return "FinancnaHviezda";
    } else if (pocetBodovPercent > 70) {
      this.pocetBodovHodnost = "Finančný kúzelník";
      this.percentil = 88;
      return "FinancnyKuzelnik";
    } else if (pocetBodovPercent > 60) {
      this.pocetBodovHodnost = "Finančný profesor";
      this.percentil = 77;
      return "FinancnyProfesor";
    } else if (pocetBodovPercent > 50) {
      this.pocetBodovHodnost = "Finančný majster";
      this.percentil = 67;
      return "FinancnyMajster";
    } else if (pocetBodovPercent > 40) {
      this.pocetBodovHodnost = "Finančný uceň";
      this.percentil = 53;
      return "FinancnyUcen";
    } else if (pocetBodovPercent > 30) {
      this.pocetBodovHodnost = "Finančný junior";
      this.percentil = 43;
      return "FinancnyJunior";
    } else if (pocetBodovPercent > 20) {
      this.pocetBodovHodnost = "Finančný nováčik";
      this.percentil = 28;
      return "FinancnyNovacik";
    } else if (pocetBodovPercent > 10) {
      this.pocetBodovHodnost = "Finančný začiatočník";
      this.percentil = 12;
      return "FinancnyZaciatocnik";
    } else if (pocetBodovPercent > 0) {
      this.pocetBodovHodnost = "Finančné embryo";
      this.percentil = 5;
      return "FinancneEmbryo";
    }
  }

  getQuestionById(id: string) {
    for (let i = 0; i < questionDetails.questions.length; i++) {
      const question = questionDetails.questions[i];
      if (question.id == id || id.startsWith(question.id)) {
        return question;
      }
    }
  }
  getAnswerById(id: string) {
    for (let i = 0; i < answerDetails.answers.length; i++) {
      const answer = answerDetails.answers[i];
      if (answer.id == id) {
        return answer;
      }
    }
  }
  // concatCapitalize(prefix: string, toCapitalize: string): string {
  //   return prefix + toCapitalize.charAt(0).toUpperCase() + toCapitalize.slice(1);
  // }
  resolveAnswerFinancnaGramotnost(id: string) {
    // financna gramotnost
    var question = this.getQuestionById(id);
    var answer = this.getAnswerById(id);

    if (question && answer) {
      this.pocetBodovMax += question.resultPointsMax;
      this.pocetBodovStratil += answer.resultPointsStratil;
      this.pocetBodovGramotnostMax += question.resultPointsMax;
      this.pocetBodovGramotnostStratil += answer.resultPointsStratil;

      var choiceString = document.getElementById(question.id + "UserChoice");
      if (choiceString) choiceString.innerHTML = answer.choiceString;

      var pointsSpan = document.getElementById(question.id + "Points");
      if (pointsSpan) pointsSpan.innerHTML = answer.resultPointsStratil.toString();

      this.createToggleElement(question.id, "Vysvetlenie", question.resultVysvetlenie, -1, "Vysvetlenie");
    } else {
      console.log(id + " not found in answer json");
    }
  }
  resolveAnswer(id: string) {
    // je to sekcia financnej gramotnosti?
    if (typeof id == "string") {
      // odpoved je string
      if (id.startsWith("financnaGramotnost")) {
        this.resolveAnswerFinancnaGramotnost(id);
      } else {
        // skusi zobrazit element podla 'id'
        this.showElementsByClass(id);

        // skusi najst v 'questionDetails.json' entry pre 'id'
        var question = this.getQuestionById(id);
        if (question) {
          this.pocetBodovMax += question.resultPointsMax;
        }

        // skusi najst v 'answerDetails.json' entry pre 'id'
        var answer = this.getAnswerById(id);
        if (answer) {
          // bodovanie
          this.pocetBodovStratil += answer.resultPointsStratil;
          // bola najdena vyplnena odpoved ktorej otazka nema entry v jsone, predpoklada sa preto max pocet bodov za otazku = 1
          if (!question) this.pocetBodovMax += 1;

          // zobraz kolko bodov clovek stratil
          var pointsSpan = document.getElementById(answer.id + "Points");
          if (pointsSpan) pointsSpan.innerHTML = answer.resultPointsStratil.toString();

          // vygeneruje toggleElement do divu podla 'id'
          this.createToggleElement(answer.id, answer.resultTitle, answer.resultVysvetlenie, answer.resultPointsStratil);
        }
      }
    } else {
      // odpoved je objekt (matica)
    }
  }

  createToggleElement(id: string, title: string, content: string, points: number = -1, divSuffix: string = ""): void {
    // check if div exists
    var divClass = id + divSuffix;
    var divs = document.getElementsByClassName(divClass);
    for (let i = 0; i < divs.length; i++) {
      const div = divs[i];
      // check if found node is a div
      if (div.nodeName == "DIV") {
        // toggle button
        var buttonToggle = document.createElement("i");
        buttonToggle.classList.add("arrow", "down");
        buttonToggle.setAttribute("name", id);
        this.renderer.listen(buttonToggle, 'click', (event) => {
          // toggle bloku textu
          this.toggleElementById(event.currentTarget.getAttribute("name") + "Content");

          // zmena znaku buttonu
          /*
          if (buttonToggle.innerHTML == "+") {
            buttonToggle.innerHTML = "-";
          } else {
            buttonToggle.innerHTML = "+";
          }
          */
        });

        // points
        if (points >= 0) {
          var spanPoints = document.createElement("span");
          spanPoints.innerHTML = " [-" + points.toString() + "b] ";
        }

        // title
        var bTitle = document.createElement("b");
        bTitle.innerHTML = title;
        var pTitle = document.createElement("p");
        pTitle.appendChild(buttonToggle);
        if (spanPoints) pTitle.appendChild(spanPoints);
        pTitle.appendChild(bTitle);

        // content
        var pContent = document.createElement("p");
        pContent.id = id + "Content";
        pContent.setAttribute("hidden", "true");
        pContent.innerHTML = content;

        // div
        div.appendChild(pTitle);
        div.appendChild(pContent);
        div.removeAttribute("hidden");
      }
    }
  }

  showElementById(elementId: string): void {
    var element = document.getElementById(elementId);
    if (element) element.removeAttribute("hidden");
  }
  toggleElementById(elementId: string): void {
    var element = document.getElementById(elementId);
    if (element) if (element.hasAttribute("hidden")) {
      element.removeAttribute("hidden");
    } else {
      element.hidden = true;
    }
  }
  showElementsByClass(c: string) {
    var elements = document.getElementsByClassName(c);
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      element.removeAttribute("hidden");
    }
  }

  copyToClipboard(value: string): void {
    const copyElement = document.createElement('textarea');
    copyElement.style.position = 'fixed';
    copyElement.style.left = '0';
    copyElement.style.top = '0';
    copyElement.style.opacity = '0';
    copyElement.value = value;
    document.body.appendChild(copyElement);
    copyElement.focus();
    copyElement.select();
    document.execCommand('copy');
    document.body.removeChild(copyElement);
  }
  generateDataUrl(): string {
    return window.location.origin + "/result/" + btoa(JSON.stringify(this.data));
  }
  saveDataUrlAsHTML(): void {
    var htmlContent = "<head><meta http-equiv='refresh' content='0; URL=" + this.generateDataUrl() + "'></head>";
    var fileBlob = new Blob([htmlContent], { type: "text/plain;charset=utf-8" });
    var fileName = "Vysledok.html";
    FileSaver.saveAs(fileBlob, fileName);
  }
  sendDataUrlAsEmail(): void {
    var to = "";
    var from = "andrej@otestujsa.sk";
    var subject = "Výsledky Tvojho finančného dotazníku";
    var body = "";

    // email from
    var toElement = (<any>document.getElementById("emailKlientaVysledok"));
    if (toElement) to = toElement.value; else return;
    if (to.trim().length >= 7) {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(to)) {
        // error - emailova adresa nezodpoveda regexu
        return;
      }
    } else {
      // error - emailova adresa ma menej ako 7 znakov
      return;
    }

    // email body
    body = "Gratulujeme k vyplneniu bla bla bla, vysledok je v prilohe";

    // email attachments
    var htmlContent = "<head><meta http-equiv='refresh' content='0; URL=" + this.generateDataUrl() + "'></head>";
    var htmlFileBlob = new Blob([htmlContent], { type: "text/plain;charset=utf-8" });

    var _this = this;
    this.blobToDataURL(htmlFileBlob, function (htmlUrl: any) {
      _this.emailSend(to, from, subject, body, htmlUrl);
    });
  }
  copyDataUrlToClipboard(): void {
    this.copyToClipboard(this.generateDataUrl());
  }

  emailSendToAndrej(): void {
    // primitivna anti-spam kontrola
    var limit = 5;

    var emailCount = parseInt(localStorage.getItem("emailCount")) || 0;
    var emailTime: number = parseInt(localStorage.getItem("emailTime")) || 0;

    if (Date.now() >= emailTime + 86400000) {
      // od poslania posledneho emailu uplynulo 24h
      localStorage.setItem("emailCount", "1");
      localStorage.setItem("emailTime", Date.now().toString());
    } else if (emailCount >= limit) {
      // clovek poslal "limit" emailov za poslednych 24h
      alert("Za posledných 24 hodín si nám už poslal(a) " + limit + " emailov.");
      return;
    } else {
      // clovek poslal menej ako "limit" emailov za poslednych 24h
      localStorage.setItem("emailCount", (emailCount + 1).toString());
    }

    var to = "mazak.miso@gmail.com";
    var from = "";
    var subject = "Žiadosť o úvodnú konzultáciu zdarma";
    var body = "";

    // email from
    var fromElement = (<any>document.getElementById("emailKlientaZiadost"));
    if (fromElement) from = fromElement.value; else return;
    if (from.trim().length >= 7) {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(from)) {
        // error - emailova adresa nezodpoveda regexu
        return;
      }
    } else {
      // error - emailova adresa ma menej ako 7 znakov
      return;
    }

    // email body
    var bodyElement = document.getElementById("emailText");
    if (bodyElement) body = bodyElement.innerText;
    if (body.trim().length <= 0) body = "empty email body";
    body += "<br><br>" + JSON.stringify(this.data);

    // email attachments
    var htmlContent = "<head><meta http-equiv='refresh' content='0; URL=" + this.generateDataUrl() + "'></head>";
    var htmlFileBlob = new Blob([htmlContent], { type: "text/plain;charset=utf-8" });
    var _this = this;
    this.blobToDataURL(htmlFileBlob, function (htmlUrl: any) {
      // send email
      _this.emailSend(to, from, subject, body, htmlUrl);
    });
  }
  emailSend(to: string, from: string, subject: string, body: string, attachment: any = undefined): void {
    var email = {
      send: function (jsonData) {
        return new Promise(function () {
          jsonData.nocache = Math.floor(1e6 * Math.random() + 1), jsonData.Action = "Send";
          var jsonString = JSON.stringify(jsonData);
          var request = new XMLHttpRequest;
          request.open("POST", "https://smtpjs.com/v3/smtpjs.aspx?", !0);
          request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          request.send(jsonString);
        });
      }
    };

    // Email.send({
    //   // v google ucet nastaveniach treba vypnut 2-faktor autentifikaciu
    //   // v google ucet nastaveniach treba povolit "less secure apps"
    //   SecureToken : "2cb4ec7b-33de-4bb2-81ff-2dfecdd3f063",
    //   To: to,
    //   From: from,
    //   Subject: subject,
    //   Body: body
    // });

    if (attachment) {
      email.send({
        // v google ucet nastaveniach treba vypnut 2-faktor autentifikaciu
        // v google ucet nastaveniach treba povolit "less secure apps"
        Host: "smtp.gmail.com",
        Username: "surveyemailer123",
        Password: "surveyemailerandrej123",
        To: to,
        From: from,
        Subject: subject,
        Body: body,
        Attachments: [
          {
            name: "Vysledok.html",
            data: attachment
          }
        ]
      });
    } else {
      email.send({
        // v google ucet nastaveniach treba vypnut 2-faktor autentifikaciu
        // v google ucet nastaveniach treba povolit "less secure apps"
        Host: "smtp.gmail.com",
        Username: "surveyemailer123",
        Password: "surveyemailerandrej123",
        To: to,
        From: from,
        Subject: subject,
        Body: body
      });
    }

    alert("Email bol odoslaný.");
  }
  blobToDataURL(blob: Blob, callback: { (htmlUrl: any): void; (htmlUrl: any): void; (arg0: string | ArrayBuffer): void; }) {
    var fileReader = new FileReader();
    fileReader.onload = function (event) { callback(event.target.result); }
    fileReader.readAsDataURL(blob);
  }
}
