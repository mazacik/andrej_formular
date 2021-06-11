import { AnswerID } from "src/app/enum/answer-id.enum";
import { QuestionID } from "src/app/enum/question-id.enum";
import { AnswerType } from "src/app/enum/answer-type.enum";
import { EvaluationQuestion } from "src/app/model/evaluation-question.model";
import { EvaluationAnswer } from "src/app/model/evaluation-answer.model";
import { EvaluationData } from "src/app/data/evaluation-data";

export class EvaluationHelper {

  private surveyData: any;

  private total: number = 0;
  private points: number = 0;

  private answersPositive: EvaluationAnswer[] = [];
  private answersNegative: EvaluationAnswer[] = [];

  private vyskaPrijmu: number;
  private kolkoMesacneSpori: number;
  private kolkoMesacneOstavaNaUcte: number;
  private investicieMesacne: number;
  private zivotnePoistenieKolkoPlati: number;
  private mesacneOdkladanieCelkove: number;
  private mesacneOdkladanieNaRezervu: number;
  private odkladaniePenaziVyska: number;
  private hypotekaVyskaSplatky: number;
  private uverPozickaVyskaSplatky: number;
  private uverHypotekaPozickaVyskaSplatky: number;

  constructor(surveyData: any) {
    this.surveyData = surveyData;

    this.vyskaPrijmu = this.getAnswerValue(QuestionID.vyskaPrijmu);
    this.kolkoMesacneSpori = this.getAnswerValue(QuestionID.kolkoMesacneSpori);
    this.kolkoMesacneOstavaNaUcte = this.getAnswerValue(QuestionID.kolkoMesacneOstavaNaUcte);
    this.investicieMesacne = this.getAnswerValue(QuestionID.investicieMesacne);
    this.zivotnePoistenieKolkoPlati = this.getAnswerValue(QuestionID.zivotnePoistenieKolkoPlati);
    this.mesacneOdkladanieCelkove = this.kolkoMesacneSpori + this.kolkoMesacneOstavaNaUcte + this.investicieMesacne + this.zivotnePoistenieKolkoPlati;
    this.mesacneOdkladanieNaRezervu = this.kolkoMesacneSpori + this.kolkoMesacneOstavaNaUcte;
    this.odkladaniePenaziVyska = this.getAnswerValue(QuestionID.odkladaniePenaziVyska);
    this.hypotekaVyskaSplatky = this.getAnswerValue(QuestionID.hypotekaVyskaSplatky);
    this.uverPozickaVyskaSplatky = this.getAnswerValue(QuestionID.uverPozickaVyskaSplatky);
    this.uverHypotekaPozickaVyskaSplatky = this.hypotekaVyskaSplatky + this.uverPozickaVyskaSplatky;
  }

  public process(): void {
    for (const questionID in this.surveyData) {
      this.processQuestion(questionID);
    }
  }

  private processQuestion(questionID: string): void {
    const evaluationQuestion: EvaluationQuestion = this.getEvaluationQuestion(questionID);
    if (evaluationQuestion) {
      const evaluationAnswer: EvaluationAnswer = this.resolveEvaluationAnswer(evaluationQuestion);

      switch (evaluationAnswer.id) {
        case AnswerID.tretiPilierNemam:
          return;
      }

      this.total += evaluationQuestion.weight;
      this.points += evaluationQuestion.weight * evaluationAnswer.type;

      switch (evaluationAnswer.type) {
        case AnswerType.POSITIVE:
          this.answersPositive.push(evaluationAnswer);
          break;
        case AnswerType.NEGATIVE:
          this.answersNegative.push(evaluationAnswer);
          break;
      }
    }
  }

  private resolveEvaluationAnswer(evaluationQuestion: EvaluationQuestion): EvaluationAnswer {
    switch (evaluationQuestion.id) {
      case QuestionID.odkladaniePenaziVyska:
        if (this.odkladaniePenaziVyska <= this.vyskaPrijmu) {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.odkladaniePenaziVyskaDo1x);
        } else if (this.odkladaniePenaziVyska <= this.vyskaPrijmu * 3) {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.odkladaniePenaziVyskaDo3x);
        } else if (this.odkladaniePenaziVyska <= this.vyskaPrijmu * 6) {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.odkladaniePenaziVyskaDo6x);
        } else {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.odkladaniePenaziVyskaNad6x);
        }
      case QuestionID.kolkoMesacneOstavaNaUcte:
        if (this.mesacneOdkladanieCelkove <= this.vyskaPrijmu * 0.1) {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.kolkoMesacneOstavaNaUcteDo10);
        } else if (this.mesacneOdkladanieCelkove <= this.vyskaPrijmu * 0.3) {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.kolkoMesacneOstavaNaUcteDo30);
        } else {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.kolkoMesacneOstavaNaUcteNad30);
        }
      case QuestionID.kolkoMesacneSpori:
        if (this.mesacneOdkladanieNaRezervu == 0) {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.kolkoMesacneSporiNic);
        } else if (this.mesacneOdkladanieNaRezervu <= this.vyskaPrijmu * 0.05) {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.kolkoMesacneSporiDo5);
        } else {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.kolkoMesacneSporiNad5);
        }
      case QuestionID.zivotnePoistenieKolkoPlati:
        if (this.zivotnePoistenieKolkoPlati <= this.vyskaPrijmu * 0.03) {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.zivotnePoistenieKolkoPlatiPod3);
        } else if (this.zivotnePoistenieKolkoPlati <= this.vyskaPrijmu * 0.05) {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.zivotnePoistenieKolkoPlati3az5);
        } else {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.zivotnePoistenieKolkoPlatiNad5);
        }
      case QuestionID.investicieMesacne:
        if (this.investicieMesacne <= this.vyskaPrijmu * 0.05) {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.investicieMesacneDo5);
        } else if (this.investicieMesacne <= this.vyskaPrijmu * 0.1) {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.investicieMesacneDo10);
        } else {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.investicieMesacneNad10);
        }
      case QuestionID.uverHypotekaPozicka:
        if (this.uverHypotekaPozickaVyskaSplatky <= this.vyskaPrijmu * 0.2) {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.uverHypotekaPozickaDo20);
        } else if (this.uverHypotekaPozickaVyskaSplatky <= this.vyskaPrijmu * 0.3) {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.uverHypotekaPozickaDo30);
        } else {
          return this.getEvaluationAnswer(evaluationQuestion, AnswerID.uverHypotekaPozickaNad30);
        }
      default:
        return this.getEvaluationAnswer(evaluationQuestion, this.surveyData[evaluationQuestion.id]);
    }
  }

  private getEvaluationQuestion(questionID: string): EvaluationQuestion {
    return EvaluationData.find(question => question.id == questionID);
  }

  private getEvaluationAnswer(evaluationQuestion: EvaluationQuestion, answerID: AnswerID): EvaluationAnswer {
    return evaluationQuestion.answers.find(answer => answer.id == answerID);
  }

  private getAnswerValue(questionID: QuestionID): number {
    return this.surveyData[questionID] || 0;
  }

  public getAnswersPositive(): EvaluationAnswer[] {
    return this.answersPositive;
  }

  public getAnswersNegative(): EvaluationAnswer[] {
    return this.answersNegative;
  }

  public getTotal(): number {
    return this.total;
  }

  public getPoints(): number {
    return this.points;
  }

}