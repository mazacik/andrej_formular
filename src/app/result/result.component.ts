import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as Chart from 'chart.js';

import * as questionDetails from '../json/questionDetails.json';
import * as answerDetails from '../json/answerDetails.json';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  data: any;

  pocetBodovMax: number = 0;
  pocetBodovStratil: number = 0;
  dosiahnutaHodnost: string = "";

  percentHorsich: number = 45;
  percentHorsichProdukty: number = 37;
  percentHorsichPracaSPeniazmi: number = 75;
  percentHorsichGramotnost: number = 39;
  challengeLink: string = "";

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
    } else {
      // survey
      var survey = (<any>window).survey;
      if (survey) this.data = survey.data;
    }

    if (!this.data) {
      this.data = '{"meno": ""}'; // prevents console error
      this.router.navigate(['intro']);
    } else {
      // cyklus hlada zhodu ID vybratej odpovede a ID HTML elementu
      for (var value in this.data) {
        var answerId = this.data[value];
        if (typeof answerId == 'string') {
          this.resolveAnswer(answerId);
        } else {
          for (let i = 0; i < answerId.length; i++) {
            this.resolveAnswer(answerId[i]);
          }
        }
      }

      // odlozit50percentprijmu
      if (this.data.odkladaniePenaziVyska >= this.data.vyskaPrijmu * 0.5) {
        this.pocetBodovStratil += 1;
        this.showElementsByClass("odlozit50percentprijmu");
      }

      // vyskarezervy5nasobokprijmu
      if (this.data.financnaRezervaVyska >= this.data.vyskaPrijmu * 5) {
        this.pocetBodovStratil += 1;
        this.showElementsByClass("vyskarezervy5nasobokprijmu");
      }

      // mesacnarezerva30percentprijmu
      if (this.data.financnaRezervaMesacne >= this.data.vyskaPrijmu * 0.3) {
        this.pocetBodovStratil += 1;
        this.showElementsByClass("mesacnarezerva30percentprijmu");
      }

      // nasi odbornici
      this.createToggleElement("ktoSuNasiOdbornici", "Kto sú naši odborníci?",
        "Karolína Lehocká za dôchodky → Učiteľka dôchodkového systému<br>" +
        "Ondrej Broska za investície → Riaditeľ spoločnosti TowerFinance<br>" +
        "Marián Markech za poistenia → Bývalý generálny riaditeľ Axa<br>" +
        "Martin Kraus za hypotéky → Bývalý Teamleader v prvej stavebnej sporiteľni<br>" +
        "Andrej Nejedlík za komunikáciu s klientami → autor projektu");

      // dosiahnuta hodnost
      var hodnost: string;
      if (this.pocetBodovStratil > 10) {
        this.dosiahnutaHodnost = "Finančná legenda";
        hodnost = "FinancnaLegenda";
      } else if (this.pocetBodovStratil > 8) {
        this.dosiahnutaHodnost = "Finančná sova";
        hodnost = "FinancnaSova";
      } else if (this.pocetBodovStratil > 6) {
        this.dosiahnutaHodnost = "Finančná hviezda";
        hodnost = "FinancnaHviezda";
      } else if (this.pocetBodovStratil > 4) {
        this.dosiahnutaHodnost = "Finančný profesor";
        hodnost = "FinancnyProfesor";
      } else if (this.pocetBodovStratil > 2) {
        this.dosiahnutaHodnost = "Finančný ninja";
        hodnost = "FinancnyNinja";
      } else if (this.pocetBodovStratil > 0) {
        this.dosiahnutaHodnost = "Finančný kúzelník";
        hodnost = "FinancnyKuzelnik";
      } else if (this.pocetBodovStratil == 0) {
        this.dosiahnutaHodnost = "Finančný dospelák";
        hodnost = "FinancnyDospelak";
      } else if (this.pocetBodovStratil > -2) {
        this.dosiahnutaHodnost = "Finančný uceň";
        hodnost = "FinancnyUcen";
      } else if (this.pocetBodovStratil > -4) {
        this.dosiahnutaHodnost = "Finančný študent";
        hodnost = "FinancnyStudent";
      } else if (this.pocetBodovStratil > -6) {
        this.dosiahnutaHodnost = "Finančný junior";
        hodnost = "FinancnyJunior";
      } else if (this.pocetBodovStratil > -8) {
        this.dosiahnutaHodnost = "Finančný začiatočník";
        hodnost = "FinancnyZaciatocnik";
      } else if (this.pocetBodovStratil > -10) {
        this.dosiahnutaHodnost = "Finančný prváčik";
        hodnost = "FinancnyPrvacik";
      } else if (this.pocetBodovStratil > -12) {
        this.dosiahnutaHodnost = "Finančné embryo";
        hodnost = "FinancneEmbryo";
      }

      // vytvor challengeLink
      this.challengeLink = window.location.origin + "/intro/" + this.data.meno + "/" + hodnost;

      // graf proof of concept - chartjs
      var vyskaPrijmu = 0;
      var investicieKratkobe = 0;
      var investicieDlhodobe = 0;
      var poistenie = 0;
      var pasiva = 0;
      var spotreba = 0;

      var produktyHypotekaVyskaSplatky = this.data.produktyHypotekaVyskaSplatky;
      var produktyUverPozickaVyskaSplatky = this.data.produktyUverPozickaVyskaSplatky;

      vyskaPrijmu = this.data.vyskaPrijmu;
      if (produktyHypotekaVyskaSplatky) pasiva += produktyHypotekaVyskaSplatky;
      if (produktyUverPozickaVyskaSplatky) pasiva += produktyUverPozickaVyskaSplatky;

      var myChart = new Chart("chart-js", {
        type: 'pie',
        data: {
          labels: ['Krátkodobé investície', 'Dlhodobé investície', 'Poistenie', 'Pasíva', 'Spotreba'],
          datasets: [{
            label: '# of Votes',
            data: [investicieKratkobe, investicieDlhodobe, poistenie, pasiva, spotreba],
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
  concatCapitalize(prefix: string, toCapitalize: string): string {
    return prefix + toCapitalize.charAt(0).toUpperCase() + toCapitalize.slice(1);
  }
  resolveAnswerFinancnaGramotnost(id: string) {
    // financna gramotnost
    var question = this.getQuestionById(id);
    var answer = this.getAnswerById(id);

    if (question && answer) {
      this.pocetBodovMax += question.resultPointsMax;
      this.pocetBodovStratil += answer.resultPointsStratil;

      var choiceString = document.getElementById(question.id + "UserChoice");
      if (choiceString) choiceString.innerHTML = answer.choiceString;

      this.createToggleElement(question.id, "Vysvetlenie", question.resultVysvetlenie, "Vysvetlenie");
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

        // skusi zobrazit div podla 'id'
        this.showElementsByClass(this.concatCapitalize("div", id));

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

          // vygeneruje toggleElement do divu podla 'id' (napr. pre 'id' "misko" musi byt div.id "divMisko")
          this.createToggleElement(answer.id, answer.resultTitle, answer.resultVysvetlenie);
        } else {
          // detaily neboli najdene, skus zobrazit div podla IDcka
          var divId = this.concatCapitalize("div", id);
          this.showElementsByClass(divId);
        }
      }
    } else {
      // odpoved je objekt (matica)
    }
  }
  createToggleElement(id: string, title: string, content: string, divSuffix: string = ""): void {
    // check if div exists
    var divClass = this.concatCapitalize("div", id) + divSuffix;
    var divs = document.getElementsByClassName(divClass);
    for (let i = 0; i < divs.length; i++) {
      const div = divs[i];
      // toggle button
      var buttonToggle = document.createElement("button");
      buttonToggle.innerHTML = "+";
      buttonToggle.setAttribute("name", id);
      this.renderer.listen(buttonToggle, 'click', (event) => this.toggleElementById(event.currentTarget.getAttribute("name") + "Content"));

      // title
      var bTitle = document.createElement("b");
      bTitle.innerHTML = title;
      var pTitle = document.createElement("p");
      pTitle.appendChild(buttonToggle);
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
