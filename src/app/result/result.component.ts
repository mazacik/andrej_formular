import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import tippy from 'tippy.js';

import { ToggleElement } from './funct/toggleelement';
import { ResultBodovanie } from './funct/bodovanie';
import { ResultPodmienky } from './funct/podmienky';
import { ResultGraphs } from './funct/grafy';
import { ResultEmail } from './funct/email';
import { ResultNaj3 } from './funct/naj3';

import * as questionDetails from '../json/questionDetails.json';
import * as answerDetails from '../json/answerDetails.json';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  resultBodovanie: ResultBodovanie = new ResultBodovanie();
  resultPodmienky: ResultPodmienky = new ResultPodmienky();

  data: any;

  constructor(
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
      this.router.navigate(['otazky']);
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

      // vysvetlenie bodovania
      var pozrietSystemBodovania = this.getAnswerById('pozrietSystemBodovania');
      ToggleElement.createFromAnswer(pozrietSystemBodovania);

      // tooltip
      tippy('[data-tippy-content]');

      // manualne veci podla podmienok
      this.resultPodmienky.evaluate(this.resultBodovanie, this.data);

      // naj3
      ResultNaj3.calculate(this.data);

      // bodovanie
      this.resultBodovanie.calculate(this.data.meno);

      // grafy
      ResultGraphs.draw(this.data);

      // dozvies sa viac o...
      //this.createDozviesSaViac();
    }
  }

  createDozviesSaViac(): void {
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
  getAnswersStartingWithId(id: string) {
    var answers = [];
    for (let i = 0; i < answerDetails.answers.length; i++) {
      const answer = answerDetails.answers[i];
      if (answer.id.startsWith(id)) {
        answers[answers.length] = answer;
      }
    }
    return answers;
  }

  resolveAnswerFinancnaGramotnost(id: string) {
    // financna gramotnost
    var question = this.getQuestionById(id);
    var answer = this.getAnswerById(id);

    if (question && answer) {
      this.resultBodovanie.pocetBodovMax += question.resultPointsMax;
      this.resultBodovanie.pocetBodovStratil += answer.resultPointsStratil;
      this.resultBodovanie.pocetBodovGramotnostMax += question.resultPointsMax;
      this.resultBodovanie.pocetBodovGramotnostStratil += answer.resultPointsStratil;

      var choiceString = document.getElementById(question.id + "UserChoice");
      if (choiceString) choiceString.innerHTML = answer.choiceString;

      var pointsSpan = document.getElementById(question.id + "Points");
      if (pointsSpan) pointsSpan.innerHTML = answer.resultPointsStratil.toString();

      // var userChoiceElements = document.getElementsByClassName(question.id + "UserChoice");
      // for (let i = 0; i < userChoiceElements.length; i++) {
      //   const element = userChoiceElements[i];
      //   element.innerHTML = answer.choiceString;
      // }

      // var pointsElements = document.getElementsByClassName(question.id + "Points");
      // for (let i = 0; i < pointsElements.length; i++) {
      //   const element = pointsElements[i];
      //   element.innerHTML = answer.resultPointsStratil.toString();
      // }

      var divs = document.getElementsByClassName(question.id);
      for (let i = 0; i < divs.length; i++) {
        const div = divs[i];
        if (answer.resultPointsStratil == 0) {
          div.classList.add("gramotnost-dobre");
          // div.setAttribute("style", "background-color: green;");
        } else if (answer.resultPointsStratil == 0.5) {
          div.classList.add("gramotnost-neutral");
          // div.setAttribute("style", "background-color: orange;");
        } else if (answer.resultPointsStratil == 1) {
          div.classList.add("gramotnost-zle");
          // div.setAttribute("style", "background-color: red;");
        }
      }

      ToggleElement.create(question.id, "Vysvetlenie", question.resultVysvetlenie, -1, "Vysvetlenie");
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
      } else if (id.startsWith("coChcesVediet")) {
        var answers = this.getAnswersStartingWithId(id);
        // zobrazi "nadpis"
        this.showElementsByClass(id);
        for (let i = 0; i < answers.length; i++) {
          const answer = answers[i];
          // vygeneruje toggleElement do divu podla 'id'
          ToggleElement.create(answer.id, answer.resultTitle, answer.resultVysvetlenie);
        }
      } else {
        // skusi zobrazit element podla 'id'
        this.showElementsByClass(id);

        // skusi najst v 'questionDetails.json' entry pre 'id'
        var question = this.getQuestionById(id);
        if (question) this.resultBodovanie.pocetBodovMax += question.resultPointsMax;

        // skusi najst v 'answerDetails.json' entry pre 'id'
        var answer = this.getAnswerById(id);
        if (answer) {
          // bodovanie
          this.resultBodovanie.pocetBodovStratil += answer.resultPointsStratil;
          // bola najdena vyplnena odpoved ktorej otazka nema entry v jsone, predpoklada sa preto max pocet bodov za otazku = 1
          if (!question) this.resultBodovanie.pocetBodovMax += 1;

          // zobraz kolko bodov clovek stratil
          var pointsSpan = document.getElementById(answer.id + "Points");
          if (pointsSpan) pointsSpan.innerHTML = answer.resultPointsStratil.toString();

          // vygeneruje toggleElement do divu podla 'id'
          ToggleElement.create(answer.id, answer.resultTitle, answer.resultVysvetlenie, answer.resultPointsStratil);
        }
      }
    } else {
      // odpoved je objekt (matica)
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

  getDataURL(): string {
    return window.location.origin + "/vyhodnotenie/" + btoa(JSON.stringify(this.data));
  }
  saveHTML_dataURL(): void {
    var htmlContent = "<head><meta http-equiv='refresh' content='0; URL=" + this.getDataURL() + "'></head>";
    var fileBlob = new Blob([htmlContent], { type: "text/plain;charset=utf-8" });
    var fileName = "Vysledok.html";
    FileSaver.saveAs(fileBlob, fileName);
  }
  clipboard(value: string): void {
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
  clipboard_dataURL(): void {
    this.clipboard(this.getDataURL());
  }
  email_dataURL(): void {
    ResultEmail.email_dataURL(this.getDataURL());
  }
  email_ziadost(): void {
    ResultEmail.email_ziadost(this.getDataURL(), this.data);
  }
}
