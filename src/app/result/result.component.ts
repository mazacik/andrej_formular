import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  data: any = (<any>window).survey.data;

  constructor() { }

  ngOnInit(): void {
    function removeHiddenFromElement(elementId: string) {
      var element = document.getElementById(elementId);
      if (element) element.removeAttribute("hidden");
    }

    if (this.data) {
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
  }
}
