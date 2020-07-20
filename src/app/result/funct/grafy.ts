import * as Chart from 'chart.js';

export class ResultGraphs {
  static draw(data: any) {
    var vyskaPrijmu = data.vyskaPrijmu;
    var investicieKratkobe = this.calcInvesticieKratkodobe(data);
    var investicieDlhodobe = this.calcInvesticieDlhodobe(data);
    var pasiva = this.calcPasiva(data);
    var poistenie = this.calcPoistenie(data);
    var spotreba = vyskaPrijmu - investicieKratkobe - investicieDlhodobe - pasiva - poistenie;

    this.drawGraphUserInfo(investicieKratkobe, investicieDlhodobe, poistenie, pasiva, spotreba);
    this.drawGraphIdeal(vyskaPrijmu);
  }

  private static drawGraphUserInfo(investicieKratkobe: number, investicieDlhodobe: number, poistenie: number, pasiva: number, spotreba: number): void {
    new Chart("graf-vyplneny", {
      type: 'pie',
      data: {
        labels: ['Krátkodobé investície a rezerva [10%]', 'Dlhodobé investície [10-15%]', 'Poistenie [3-4%]', 'Úvery a bývanie [max 30%]', 'Spotreba [40%]'],
        datasets: [{
          label: '# of Votes',
          data: [investicieKratkobe, investicieDlhodobe, poistenie, pasiva, spotreba],
          backgroundColor: [
            'rgba(59, 48, 27, 1)',
            'rgba(207, 67, 39, 1)',
            'rgb(193,124,0,1)',
            'rgba(46, 196, 182, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderColor: [
            'rgba(59, 48, 27, 1)',
            'rgba(207, 67, 39, 1)',
            'rgb(193,124,0,1)',
            'rgba(46, 196, 182,1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 2
        }]
      },
      options: {
        maintainAspectRatio: false
      }
    });
  }
  private static drawGraphIdeal(vyskaPrijmu: number): void {
    new Chart("graf-idealny", {
      type: 'pie',
      data: {
        labels: ['Krátkodobé investície a rezerva [10%]', 'Dlhodobé investície [10-15%]', 'Poistenie [3-4%]', 'Úvery a bývanie [max 30%]', 'Spotreba [40%]'],
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
            'rgb(193,124,0,1)',
            'rgba(46, 196, 182, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderColor: [
            'rgba(59, 48, 27, 1)',
            'rgba(207, 67, 39, 1)',
            'rgb(193,124,0,1)',
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
  }

  static calcInvesticieKratkodobe(data: any): number {
    var value = 0;
    if (data.konzervativneInvesticie) {
      for (let i = 0; i < data.konzervativneInvesticie.length; i++) {
        const entry = data.konzervativneInvesticie[i];
        if (entry.frekvenciaMesacneHodnota) {
          value += entry.frekvenciaMesacneHodnota;
        } else if (entry.frekvenciaNepravidelneHodnota) {
          value += entry.frekvenciaNepravidelneHodnota / 6;
        }
      }
    }
    value += data.financnaRezervaMesacne;

    return value;
  }

  static calcInvesticieDlhodobe(data: any): number {
    var value = 0;
    if (data.dynamickeInvesticie) {
      for (let i = 0; i < data.dynamickeInvesticie.length; i++) {
        const entry = data.dynamickeInvesticie[i];
        if (entry.dynamickeInvesticiefrekvenciaMesacneHodnota) {
          value += entry.dynamickeInvesticiefrekvenciaMesacneHodnota;
        } else if (entry.dynamickeInvesticiefrekvenciaNepravidelneHodnota) {
          value += entry.dynamickeInvesticiefrekvenciaNepravidelneHodnota / 6;
        }
      }
    }

    if (data.pageProduktyTretiPilierVyskaPrispevku) value += data.pageProduktyTretiPilierVyskaPrispevku;
    if (data.pageProduktyZivotnePoistenieInvesticiaVyska) value += data.pageProduktyZivotnePoistenieInvesticiaVyska;

    return value;
  }

  static calcPasiva(data: any): number {
    var value = 0;
    if (data.produktyHypotekaVyskaSplatky) value += data.produktyHypotekaVyskaSplatky;
    if (data.produktyUverPozickaVyskaSplatky) value += data.produktyUverPozickaVyskaSplatky;
    if (data.najomne) value += data.najomne;

    return value;
  }
  private static calcPoistenie(data: any): number {
    var value = 0;
    if (data.produktyZivotnePoistenieKolkoPlati) value += data.produktyZivotnePoistenieKolkoPlati;
    if (data.produktyZivotnePoistenieInvesticiaVyska) value -= data.produktyZivotnePoistenieInvesticiaVyska;

    return value;
  }
}