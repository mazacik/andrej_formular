export class ResultBodovanie {
  pocetBodovMax: number = 0;
  pocetBodovStratil: number = 0;
  percent: number = 0;
  percentil: number = 0;

  pocetBodovGramotnostMax: number = 0;
  pocetBodovGramotnostStratil: number = 0;
  percentilGramotnost: number = 0;

  hodnostPretty: string = "nedefinované";
  hodnostSimple: string = "nedefinovane";

  challengeLink: string = "error";

  constructor() { }

  calculate(meno: string): void {
    this.percent = Math.round((this.pocetBodovMax - this.pocetBodovStratil) / this.pocetBodovMax * 100);

    if (this.percent > 90) {
      this.percentil = 100;
      this.hodnostPretty = "Finančná legenda";
      this.hodnostSimple = "FinancnaLegenda";
    } else if (this.percent > 80) {
      this.percentil = 95;
      this.hodnostPretty = "Finančná hviezda";
      this.hodnostSimple = "FinancnaHviezda";
    } else if (this.percent > 70) {
      this.percentil = 88;
      this.hodnostPretty = "Finančný kúzelník";
      this.hodnostSimple = "FinancnyKuzelnik";
    } else if (this.percent > 60) {
      this.percentil = 77;
      this.hodnostPretty = "Finančný profesor";
      this.hodnostSimple = "FinancnyProfesor";
    } else if (this.percent > 50) {
      this.percentil = 67;
      this.hodnostPretty = "Finančný majster";
      this.hodnostSimple = "FinancnyMajster";
    } else if (this.percent > 40) {
      this.percentil = 53;
      this.hodnostPretty = "Finančný uceň";
      this.hodnostSimple = "FinancnyUcen";
    } else if (this.percent > 30) {
      this.percentil = 43;
      this.hodnostPretty = "Finančný junior";
      this.hodnostSimple = "FinancnyJunior";
    } else if (this.percent > 20) {
      this.percentil = 28;
      this.hodnostPretty = "Finančný nováčik";
      this.hodnostSimple = "FinancnyNovacik";
    } else if (this.percent > 10) {
      this.percentil = 12;
      this.hodnostPretty = "Finančný začiatočník";
      this.hodnostSimple = "FinancnyZaciatocnik";
    } else if (this.percent > 0) {
      this.percentil = 5;
      this.hodnostPretty = "Finančné embryo";
      this.hodnostSimple = "FinancneEmbryo";
    }

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

    this.challengeLink = window.location.origin + "/uvod/" + meno + "/" + this.hodnostSimple;
  }
}