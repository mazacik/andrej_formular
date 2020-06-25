import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  data: any;

  rank: string = "Genius";
  percentHorsich: number = 45;
  challengeLink: string = "";

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    function resolveElementVisibility() {
      function removeHiddenFromElement(elementId: string) {
        var element = document.getElementById(elementId);
        if (element) element.removeAttribute("hidden");
      }

      // cyklus hlada zhodu ID vybratej odpovede a ID HTML elementu - pri zhode sa element zobrazi
      for (var value in this.data) {
        var resultId = this.data[value];
        removeHiddenFromElement(resultId);
      }

      // odlozit50percentprijmu
      if (this.data.odkladaniePenaziVyska >= this.data.vyskaPrijmu * 0.5) {
        removeHiddenFromElement("odlozit50percentprijmu");
      }

      // vyskarezervy5nasobokprijmu
      if (this.data.financnaRezervaVyska >= this.data.vyskaPrijmu * 5) {
        removeHiddenFromElement("vyskarezervy5nasobokprijmu");
      }

      // mesacnarezerva30percentprijmu
      if (this.data.financnaRezervaMesacne >= this.data.vyskaPrijmu * 0.3) {
        removeHiddenFromElement("mesacnarezerva30percentprijmu");
      }
    }

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
      // vytvor challengeLink
      this.challengeLink = window.location.origin + "/intro/" + this.data.meno + "/" + this.rank;

      () => resolveElementVisibility();
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
}
