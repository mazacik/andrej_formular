import { EvaluationAnswer } from "./evaluation-answer.model";

export interface EvaluationQuestion {
  id: string;
  weight: number;
  answers?: EvaluationAnswer[];
}