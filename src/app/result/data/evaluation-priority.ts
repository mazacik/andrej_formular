import { AnswerID } from "src/app/result/enum/answer-id.enum";

export abstract class EvaluationPriority {

  private static positive: AnswerID[] = [
    AnswerID.kolkoMesacneOstavaNaUcteNad30,
    AnswerID.zivotnePoistenieMa,
    AnswerID.investicieAno,
    AnswerID.majetokBytDomPoistenieKomplexne,
    AnswerID.druhyPilierFondyIndexove,
    AnswerID.odkladaniePenaziVyskaDo6x,
    AnswerID.hypotekaUrokDo1,
    AnswerID.kolkoMesacneSporiNad5,
    AnswerID.investicieMesacneNad10,
    AnswerID.zivotnePoistenieInvesticiaNie,
    AnswerID.druhyPilierAno,
    AnswerID.tretiPilierAnoZamestnavatelPrispieva,
    AnswerID.tretiPilierFondyIndexove,
    AnswerID.zivotnePoistenieKolkoPlati3az5,
    AnswerID.uverHypotekaPozickaDo20
  ];
  private static negative: AnswerID[] = [
    AnswerID.kolkoMesacneSporiNic,
    AnswerID.zivotnePoistenieNema,
    AnswerID.investicieNie,
    AnswerID.odkladaniePenaziVyskaDo1x,
    AnswerID.majetokBytDomPoistenieVobec,
    AnswerID.druhyPilierFondyDlhopisove,
    AnswerID.tretiPilierFondyDlhopisove,
    AnswerID.hypotekaUrokViacAko2,
    AnswerID.uverHypotekaPozickaNad30,
    AnswerID.uverPozickaUrokViacAko10,
    AnswerID.kolkoMesacneOstavaNaUcteDo10,
    AnswerID.druhyPilierNie,
    AnswerID.druhyPilierFondyNeviem,
    AnswerID.tretiPilierFondyNeviem,
    AnswerID.hypotekaUrokNeviem,
    AnswerID.uverPozickaUrokNeviem,
    AnswerID.tretiPilierAnoZamestnavatelNeprispieva,
    AnswerID.druhyPilierFondyZmiesane,
    AnswerID.tretiPilierFondyZmiesane,
    AnswerID.majetokBytDomPoistenieNieKomplexne,
    AnswerID.zivotnePoistenieInvesticiaAno,
    AnswerID.investicieMesacneDo5,
    AnswerID.odkladaniePenaziVyskaDo3x
  ];
  private static neutral: AnswerID[] = [
    AnswerID.uverPozickaUrokDo5,
    AnswerID.uverPozickaUrok5az10,
    AnswerID.hypotekaUrok1az2,
    AnswerID.uverHypotekaPozickaDo30,
    AnswerID.tretiPilierFondyAkciove,
    AnswerID.druhyPilierFondyAkciove,
    AnswerID.zivotnePoistenieKolkoPlatiNad5,
    AnswerID.kolkoMesacneOstavaNaUcteDo30,
    AnswerID.odkladaniePenaziVyskaNad6x,
    AnswerID.zivotnePoisteniePlatiNiektoIny,
    AnswerID.investicieMesacneDo10,
    AnswerID.tretiPilierNeviem,
    AnswerID.zivotnePoistenieInvesticiaNeviem,
    AnswerID.kolkoMesacneSporiDo5,
    AnswerID.majetokBytDomPoistenieNeviemAko,
    AnswerID.druhyPilierNeviem,
    AnswerID.zivotnePoistenieKolkoPlatiPod3
  ];

  public static getPositive(): AnswerID[] {
    return [...this.positive, ...this.neutral];
  }

  public static getNegative(): AnswerID[] {
    return [...this.negative, ...this.neutral.reverse()];
  }

};