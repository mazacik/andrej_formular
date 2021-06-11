export class RankHelper {

  private name: string;
  private percentage: number;

  private percentile: number;
  private rank: string;
  private challengeLink: string;

  constructor(name: string, percentage: number) {
    this.name = name;
    this.percentage = percentage;

    this.calculate();
  }

  calculate(): void {
    var rankSimple: string;

    if (this.percentage > 90) {
      this.percentile = 100;
      this.rank = "Finančná legenda";
      rankSimple = "FinancnaLegenda";
    } else if (this.percentage > 80) {
      this.percentile = 95;
      this.rank = "Finančná hviezda";
      rankSimple = "FinancnaHviezda";
    } else if (this.percentage > 70) {
      this.percentile = 88;
      this.rank = "Finančný kúzelník";
      rankSimple = "FinancnyKuzelnik";
    } else if (this.percentage > 60) {
      this.percentile = 77;
      this.rank = "Finančný profesor";
      rankSimple = "FinancnyProfesor";
    } else if (this.percentage > 50) {
      this.percentile = 67;
      this.rank = "Finančný majster";
      rankSimple = "FinancnyMajster";
    } else if (this.percentage > 40) {
      this.percentile = 53;
      this.rank = "Finančný učeň";
      rankSimple = "FinancnyUcen";
    } else if (this.percentage > 30) {
      this.percentile = 43;
      this.rank = "Finančný junior";
      rankSimple = "FinancnyJunior";
    } else if (this.percentage > 20) {
      this.percentile = 28;
      this.rank = "Finančný nováčik";
      rankSimple = "FinancnyNovacik";
    } else if (this.percentage > 10) {
      this.percentile = 12;
      this.rank = "Finančný začiatočník";
      rankSimple = "FinancnyZaciatocnik";
    } else {
      this.percentile = 5;
      this.rank = "Finančné embryo";
      rankSimple = "FinancneEmbryo";
    }

    this.challengeLink = window.location.origin + "/challenge/" + this.name + "/" + rankSimple;
  }

  public getPercentile(): number {
    return this.percentile;
  }

  public getRank(): string {
    return this.rank;
  }

  public getChallengeLink(): string {
    return this.challengeLink;
  }


}