import { ToggleElement } from './toggleelement';
import { ResultBodovanie } from './bodovanie';
import { ResultNaj3 } from './naj3';

import * as answerDetails from '../../json/answerDetails.json';
import { ResultGraphs } from './grafy';

export class ResultPodmienky {
  bodovanie: ResultBodovanie;

  constructor() { }

  evaluate(bodovanie: ResultBodovanie, data: any): void {
    this.bodovanie = bodovanie;

    //produktyUverHypotekaPozickaNemaUver
    if (!data.produktyUverHypotekaPozickaNemaUver) {
      this.create("produktyUverHypotekaPozickaNemaUver");
    }

    //dlhodobeInvesticieMenejAko10
    if (ResultGraphs.calcInvesticieDlhodobe(data) < data.vyskaPrijmu * 0.1) {
      this.create("dlhodobeInvesticieMenejAko10");
    }

    //dlhodobeInvesticieViacAko10
    if (ResultGraphs.calcInvesticieDlhodobe(data) >= data.vyskaPrijmu * 0.1) {
      this.create("dlhodobeInvesticieViacAko10");
    }

    //kratkodobeInvesticieViacAko10
    if (ResultGraphs.calcInvesticieKratkodobe(data) >= data.vyskaPrijmu * 0.1) {
      this.create("kratkodobeInvesticieViacAko10");
    }

    //kratkodobeInvesticieMenejAko10 ak este nema rezervu
    if ((data.financnaRezervaVyska >= data.vyskaPrijmu * 0.1 && data.financnaRezervaVyska <= data.vyskaPrijmu * 6) && ResultGraphs.calcInvesticieKratkodobe(data) < data.vyskaPrijmu * 0.1) {
      this.create("kratkodobeInvesticieMenejAko10");
    }

    //kratkodobeInvesticieMenejAko10AleUzMaRezervu ak uz nema rezervu
    if ((data.financnaRezervaVyska >= data.vyskaPrijmu * 0.1 && data.financnaRezervaVyska > data.vyskaPrijmu * 6) && ResultGraphs.calcInvesticieKratkodobe(data) < data.vyskaPrijmu * 0.1) {
      this.create("kratkodobeInvesticieMenejAko10AleUzMaRezervu");
    }

    //byvanieVyssieAko30
    if (ResultGraphs.calcPasiva(data) > data.vyskaPrijmu * 0.3) {
      this.create("byvanieVyssieAko30");
    }

    //byvanieMensieAko30
    if (ResultGraphs.calcPasiva(data) <= data.vyskaPrijmu * 0.3) {
      this.create("byvanieMensieAko30");
    }

    //zivotnePoistenieVyskaSplatkyNad4
    if ((data.produktyZivotnePoistenieKolkoPlati - data.produktyZivotnePoistenieInvesticiaVyska) > data.vyskaPrijmu * 0.04) {
      this.create("zivotnePoistenieVyskaSplatkyNad4");
    }

    //zivotnePoistenieVyskaSplatkyPod3
    if ((data.produktyZivotnePoistenieKolkoPlati - data.produktyZivotnePoistenieInvesticiaVyska) < data.vyskaPrijmu * 0.03) {
      this.create("zivotnePoistenieVyskaSplatkyPod3");
    }

    //zivotnePoistenieVyskaSplatky3az4 3 az 4%
    if ((data.produktyZivotnePoistenieKolkoPlati - data.produktyZivotnePoistenieInvesticiaVyska) >= data.vyskaPrijmu * 0.03 && data.produktyZivotnePoistenieKolkoPlati <= data.vyskaPrijmu * 0.04) {
      this.create("zivotnePoistenieVyskaSplatky3az4", 1, 0);
    }

    // odlozitViacAko20percentprijmu
    if (data.odkladaniePenaziVyska >= data.vyskaPrijmu * 0.2) {
      this.create("odlozitViacAko20percentprijmu", 1, 0);
    }

    // odlozitViacAko10percentprijmu
    if (data.odkladaniePenaziVyska >= data.vyskaPrijmu * 0.1 && data.odkladaniePenaziVyska < data.vyskaPrijmu * 0.2) {
      this.create("odlozitViacAko10percentprijmu");
    }

    // odlozitMenejAko10percentprijmu
    if (data.odkladaniePenaziVyska < data.vyskaPrijmu * 0.1) {
      this.create("odlozitMenejAko10percentprijmu");
    }

    //vyskarezervy3az6nasobokPrijmu vyska rezervy 3 az 6 nasobok
    if (data.financnaRezervaVyska >= data.vyskaPrijmu * 3 && data.financnaRezervaVyska <= data.vyskaPrijmu * 6) {
      this.create("vyskarezervy3az6nasobokPrijmu", 1, 0);
    }
    //vyskarezervyDo1nasobokPrijmu vyska rezervy do 1 nasobok prijmu
    if (data.financnaRezervaVyska < data.vyskaPrijmu) {
      this.create("vyskarezervyDo1nasobokPrijmu");
    }

    //vyskarezervyDo3nasobokPrijmu vyska rezervy do 3 nasobok prijmu
    if (data.financnaRezervaVyska >= data.vyskaPrijmu && data.financnaRezervaVyska < data.vyskaPrijmu * 3) {
      this.create("vyskarezervyDo3nasobokPrijmu");
    }

    //vyskarezervyNad6nasobokPrijmu vyska rezervy nad 6 nasobok prijmu
    if (data.financnaRezervaVyska > data.vyskaPrijmu * 6) {
      this.create("vyskarezervyNad6nasobokPrijmu");
    }

    // mesacnarezerva30percentprijmu
    if (data.financnaRezervaMesacne >= data.vyskaPrijmu * 0.3) {
      this.create("mesacnarezerva30percentprijmu", 1, 0);
    }
  }

  private create(id: string, pocetBodovMax: number = 1, pocetBodovStratil: number = -1): void {
    ResultNaj3.naj3_manualne[ResultNaj3.naj3_manualne.length] = 'naj_' + id;

    var answer = this.getAnswerById(id);
    if (answer) {
      // answer details sa zobrazia do toggle elementu
      ToggleElement.createFromAnswer(answer);

      this.bodovanie.pocetBodovMax += pocetBodovMax;
      this.bodovanie.pocetBodovStratil += answer.resultPointsStratil;
    } else {
      // zobrazi sa paragraf s classou
      this.showElementsByClass(id);

      if (pocetBodovStratil >= 0) {
        var spanPoints = document.getElementById(id + "Points");
        if (spanPoints) spanPoints.innerHTML = "[-" + pocetBodovStratil + "b] ";

        this.bodovanie.pocetBodovMax += pocetBodovMax;
        this.bodovanie.pocetBodovStratil += pocetBodovStratil;
      }
    }
  }

  private getAnswerById(id: string) {
    for (let i = 0; i < answerDetails.answers.length; i++) {
      const answer = answerDetails.answers[i];
      if (answer.id == id) {
        return answer;
      }
    }
  }

  private showElementsByClass(c: string) {
    var elements = document.getElementsByClassName(c);
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      element.removeAttribute("hidden");
    }
  }
}