export class ResultUtils {
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
        if (entry.dynamickeInvesticieFrekvenciaMesacneHodnota) {
          value += entry.dynamickeInvesticieFrekvenciaMesacneHodnota;
        } else if (entry.dynamickeInvesticiefrekvenciaNepravidelneHodnota) {
          value += entry.dynamickeInvesticiefrekvenciaNepravidelneHodnota / 6;
        }
      }
    }

    if (data.produktyTretiPilierVyskaPrispevku) value += data.produktyTretiPilierVyskaPrispevku;
    if (data.produktyZivotnePoistenieInvesticiaVyska) value += data.produktyZivotnePoistenieInvesticiaVyska;

    return value;
  }

  static calcPasiva(data: any): number {
    var value = 0;
    if (data.produktyHypotekaVyskaSplatky) value += data.produktyHypotekaVyskaSplatky;
    if (data.produktyUverPozickaVyskaSplatky) value += data.produktyUverPozickaVyskaSplatky;
    if (data.najomne) value += data.najomne;

    return value;
  }
}