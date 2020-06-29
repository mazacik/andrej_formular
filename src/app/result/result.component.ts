import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // nacitaj data
    var base64data = this.route.snapshot.params['base64data'];
    if (base64data) {
      // URL
      this.data = JSON.parse(atob(base64data));
    } else {
      // survey
      this.data = (<any>window).survey.data;
    }

    if (this.data) {
      function getAnswerDetailsById(id: string) {
        for (let i = 0; i < answersJSON.answerDetails.length; i++) {
          const question = answersJSON.answerDetails[i];
          if (question.id == id) {
            return question;
          }
        }
      }

      // cyklus hlada zhodu ID vybratej odpovede a ID HTML elementu
      for (var value in this.data) {
        var answerId = this.data[value];

        if (typeof answerId == 'string' && answerId.startsWith("financnaGramotnost")) {
          // financna gramotnost
          var userChoiceAndPoints = gramotnostJSON.userChoiceAndPoints.find(function (param) { return param.id == answerId; });
          this.pocetBodov += userChoiceAndPoints.points;
          var userChoiceElement = document.getElementById(value + "UserChoice");
          if (userChoiceElement) userChoiceElement.innerHTML = userChoiceAndPoints.userChoice;

          var correctChoiceAndContent = gramotnostJSON.correctChoiceAndContent.find(function (param) { return param.id == value; });
          if (correctChoiceAndContent) this.createToggleElement(value, "Vysvetlenie", correctChoiceAndContent.content, "Vysvetlenie");
        } else {
          // vsetko okrem financnej gramotnosti a matematiky
          var answerDetails = getAnswerDetailsById(this.data[value]);
          if (answerDetails) {
            this.pocetBodov += answerDetails.points;
            this.createToggleElement(answerDetails.id, answerDetails.title, answerDetails.content);
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

      // dosiahnuta hodnost
      if (this.pocetBodov > 10) {
        this.dosiahnutaHodnost = "Finančná legenda";
      } else if (this.pocetBodov > 8) {
        this.dosiahnutaHodnost = "Finančná sova";
      } else if (this.pocetBodov > 6) {
        this.dosiahnutaHodnost = "Finančná hviezda";
      } else if (this.pocetBodov > 4) {
        this.dosiahnutaHodnost = "Finančný profesor";
      } else if (this.pocetBodov > 2) {
        this.dosiahnutaHodnost = "Finančný ninja";
      } else if (this.pocetBodov > 0) {
        this.dosiahnutaHodnost = "Finančný kúzelník";
      } else if (this.pocetBodov == 0) {
        this.dosiahnutaHodnost = "Finančný dospelák";
      } else if (this.pocetBodov > -2) {
        this.dosiahnutaHodnost = "Finančný uceň";
      } else if (this.pocetBodov > -4) {
        this.dosiahnutaHodnost = "Finančný študent";
      } else if (this.pocetBodov > -6) {
        this.dosiahnutaHodnost = "Finančný junior";
      } else if (this.pocetBodov > -8) {
        this.dosiahnutaHodnost = "Finančný začiatočník";
      } else if (this.pocetBodov > -10) {
        this.dosiahnutaHodnost = "Finančný prváčik";
      } else if (this.pocetBodov > -12) {
        this.dosiahnutaHodnost = "Finančné embryo";
      }

      // vytvor challengeLink
      this.challengeLink = window.location.origin + "/intro/" + this.data.meno + "/" + btoa(encodeURIComponent(this.dosiahnutaHodnost));
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
    var divId = "div" + id.charAt(0).toUpperCase() + id.slice(1) + divSuffix;
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

  generateDataUrl(): string {
    return window.location.origin + "/result/" + btoa(JSON.stringify(this.data));
  }

  saveDataUrlAsHTML(): void {
    var htmlContent = "<head><meta http-equiv='refresh' content='0; URL=" + this.generateDataUrl() + "'></head>";
    var fileBlob = new Blob([htmlContent], { type: "text/plain;charset=utf-8" });
    var fileName = "Vysledok.html";
    FileSaver.saveAs(fileBlob, fileName);
  }

  copyDataUrlToClipboard(): void {
    this.copyToClipboard(this.generateDataUrl());
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

  emailSend(): void {
    var Email = {
      send: function (jsonData) {
        return new Promise(function () {
          jsonData.nocache = Math.floor(1e6 * Math.random() + 1), jsonData.Action = "Send";
          var jsonString = JSON.stringify(jsonData);
          var request = new XMLHttpRequest;
          request.open("POST", "https://smtpjs.com/v3/smtpjs.aspx?", !0);
          request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          console.log(request);
          console.log(jsonString);
          // request.send(jsonString);
        });
      }
    };

    var emailFrom = (<any>document.getElementById("emailKlienta")).value;
    if (emailFrom.trim().length >= 7) {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRegex.test(emailFrom)) {
        var emailText = document.getElementById("emailText").innerText;
        if (emailText.trim().length <= 0) {
          emailText = "no text";
        }
  
        Email.send({
          Host: "smtp.gmail.com",
          Username: "surveyemailer123",
          Password: "surveyemailerandrej123",
          To: 'mazak.miso@gmail.com',
          From: emailFrom,
          Subject: "Žiadosť o úvodnú konzultáciu zdarma",
          Body: emailText
        });
      } else {
        // error - email nezodpoveda regexu
      }
    } else {
      // error - email ma menej ako 7 znakov
    }
  }
}
