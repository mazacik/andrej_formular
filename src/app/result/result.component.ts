import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as FileSaver from 'file-saver';

import * as answersJSON from '../json/answerDetails.json';
import * as gramotnostJSON from '../json/gramotnost.json';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  data: any;

  pocetBodov: number = 0;
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
          // odpoved je string
          if (answerId.startsWith("financnaGramotnost")) {
            // financna gramotnost
            var userChoiceAndPoints = gramotnostJSON.userChoiceAndPoints.find(function (param) { return param.id == answerId; });
            if (userChoiceAndPoints) {
              this.pocetBodov += userChoiceAndPoints.points;
              var userChoiceElement = document.getElementById(value + "UserChoice");
              if (userChoiceElement) userChoiceElement.innerHTML = userChoiceAndPoints.userChoice;

              var correctChoiceAndContent = gramotnostJSON.correctChoiceAndContent.find(function (param) { return param.id == value; });
              if (correctChoiceAndContent) this.createToggleElement(value, "Vysvetlenie", correctChoiceAndContent.content, "Vysvetlenie");
            } else {
              console.log(answerId + " not found in answer json");
            }
          } else {
            // vsetko okrem financnej gramotnosti a matematiky
            this.resolveAnswer(answerId);
          }
        } else {
          // odpoved je array
          for (let i = 0; i < answerId.length; i++) {
            this.resolveAnswer(answerId[i]);
          }
        }
      }

      // odlozit50percentprijmu
      if (this.data.odkladaniePenaziVyska >= this.data.vyskaPrijmu * 0.5) {
        this.pocetBodov += 1;
        this.showElementsByClass("odlozit50percentprijmu");
      }

      // vyskarezervy5nasobokprijmu
      if (this.data.financnaRezervaVyska >= this.data.vyskaPrijmu * 5) {
        this.pocetBodov += 1;
        this.showElementsByClass("vyskarezervy5nasobokprijmu");
      }

      // mesacnarezerva30percentprijmu
      if (this.data.financnaRezervaMesacne >= this.data.vyskaPrijmu * 0.3) {
        this.pocetBodov += 1;
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
      if (this.pocetBodov > 10) {
        this.dosiahnutaHodnost = "Finančná legenda";
        hodnost = "FinancnaLegenda";
      } else if (this.pocetBodov > 8) {
        this.dosiahnutaHodnost = "Finančná sova";
        hodnost = "FinancnaSova";
      } else if (this.pocetBodov > 6) {
        this.dosiahnutaHodnost = "Finančná hviezda";
        hodnost = "FinancnaHviezda";
      } else if (this.pocetBodov > 4) {
        this.dosiahnutaHodnost = "Finančný profesor";
        hodnost = "FinancnyProfesor";
      } else if (this.pocetBodov > 2) {
        this.dosiahnutaHodnost = "Finančný ninja";
        hodnost = "FinancnyNinja";
      } else if (this.pocetBodov > 0) {
        this.dosiahnutaHodnost = "Finančný kúzelník";
        hodnost = "FinancnyKuzelnik";
      } else if (this.pocetBodov == 0) {
        this.dosiahnutaHodnost = "Finančný dospelák";
        hodnost = "FinancnyDospelak";
      } else if (this.pocetBodov > -2) {
        this.dosiahnutaHodnost = "Finančný uceň";
        hodnost = "FinancnyUcen";
      } else if (this.pocetBodov > -4) {
        this.dosiahnutaHodnost = "Finančný študent";
        hodnost = "FinancnyStudent";
      } else if (this.pocetBodov > -6) {
        this.dosiahnutaHodnost = "Finančný junior";
        hodnost = "FinancnyJunior";
      } else if (this.pocetBodov > -8) {
        this.dosiahnutaHodnost = "Finančný začiatočník";
        hodnost = "FinancnyZaciatocnik";
      } else if (this.pocetBodov > -10) {
        this.dosiahnutaHodnost = "Finančný prváčik";
        hodnost = "FinancnyPrvacik";
      } else if (this.pocetBodov > -12) {
        this.dosiahnutaHodnost = "Finančné embryo";
        hodnost = "FinancneEmbryo";
      }

      // vytvor challengeLink
      this.challengeLink = window.location.origin + "/intro/" + this.data.meno + "/" + hodnost;
    }
  }

  getAnswerDetailsById(id: string) {
    for (let i = 0; i < answersJSON.answerDetails.length; i++) {
      const question = answersJSON.answerDetails[i];
      if (question.id == id) {
        return question;
      }
    }
  }
  concatCapitalize(prefix: string, toCapitalize: string): string {
    return prefix + toCapitalize.charAt(0).toUpperCase() + toCapitalize.slice(1);
  }
  resolveAnswer(answerId: string) {
    var answerDetails = this.getAnswerDetailsById(answerId);
    if (answerDetails) {
      // detaily boli najdene, vygeneruj toggleElement do divu podla IDcka
      this.pocetBodov += answerDetails.points;
      this.createToggleElement(answerDetails.id, answerDetails.title, answerDetails.content);
    } else {
      // detaily neboli najdene, skus zobrazit div podla IDcka
      var divId = this.concatCapitalize("div", answerId);
      this.showElementById(divId);
    }
  }
  createToggleElement(id: string, title: string, content: string, divSuffix: string = ""): void {
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
    var divId = this.concatCapitalize("div", id) + divSuffix;
    var div = document.getElementById(divId);

    div.appendChild(pTitle);
    div.appendChild(pContent);

    this.showElementById(divId);
  }

  hideElementById(elementId: string): void {
    var element = document.getElementById(elementId);
    if (element) element.hidden = true;
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
