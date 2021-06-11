import { AnswerID } from "../enum/answer-id.enum";
import { AnswerType } from "../enum/answer-type.enum";

export interface EvaluationAnswer {
  id: AnswerID;
  type: AnswerType;
  text: string;
}