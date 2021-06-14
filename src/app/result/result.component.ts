import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import tippy from 'tippy.js';

import { QuestionID } from './enum/question-id.enum';
import { RankHelper } from './helper/rank.helper';
import { EvaluationHelper } from './helper/evaluation.helper';
import { EvaluationPriority } from './data/evaluation-priority';
import { EvaluationAnswer } from './model/evaluation-answer.model';
import { RankLevelsData } from './data/rank-levels.data';
import { AnswerID } from './enum/answer-id.enum';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  rankHelper: RankHelper;
  evaluationHelper: EvaluationHelper;

  data: any;

  name: string;
  points: number;
  total: number;
  percentage: number;

  rank: string;
  percentile: number;

  top3positive: EvaluationAnswer[] = [];
  top3negative: EvaluationAnswer[] = [];

  rankLevelsData = RankLevelsData;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    document.body.classList.remove('body-survey');
    document.body.classList.add('body-result');
    document.getElementsByTagName('html').item(0).classList.remove('body-survey');
    document.getElementsByTagName('html').item(0).classList.add('body-result');

    var base64data = this.route.snapshot.params['base64data'];
    if (base64data) {
      try {
        this.data = JSON.parse(atob(base64data));
      } catch (e) {
        this.router.navigate(['']);
      }
    }

    this.evaluationHelper = new EvaluationHelper(this.data);
    this.evaluationHelper.process();

    this.name = this.data[QuestionID.meno];
    this.points = this.evaluationHelper.getPoints();
    this.total = this.evaluationHelper.getTotal();
    this.percentage = Math.round(this.points / this.total * 100);

    this.rankHelper = new RankHelper(this.name, this.percentage);
    this.rankHelper.calculate();

    this.rank = this.rankHelper.getRank();
    this.percentile = this.rankHelper.getPercentile();

    const evaluationPriorityPositive: AnswerID[] = EvaluationPriority.getPositive();
    this.top3positive = this.evaluationHelper.getAnswersPositive().sort((a, b) => {
      return evaluationPriorityPositive.indexOf(a.id) - evaluationPriorityPositive.indexOf(b.id);
    }).slice(0, 3);

    const evaluationPriorityNegative: AnswerID[] = EvaluationPriority.getNegative();
    this.top3negative = this.evaluationHelper.getAnswersNegative().sort((a, b) => {
      return evaluationPriorityNegative.indexOf(a.id) - evaluationPriorityNegative.indexOf(b.id);
    }).slice(0, 3);

    tippy('#button-challenge', {
      maxWidth: 'none',
      placement: 'auto',
      theme: 'light',
      content: 'Link skopírovaný!',
      trigger: 'click',
      hideOnClick: false,
      duration: [500, 500],
      animation: 'shift-away',
      allowHTML: true,
      onShow(instance) {
        setTimeout(() => {
          instance.hide();
        }, 3000);
      }
    });

    const template = document.getElementById('tippy-rank-content');
    template.style.display = 'table';
    tippy('#tippy-rank', {
      maxWidth: 'none',
      placement: 'auto',
      theme: 'light',
      content: template,
      trigger: 'mouseenter',
      duration: [500, 500],
      animation: 'shift-away',
      allowHTML: true
    });
  }

  copy(value: string): void {
    const copyElement = document.createElement('textarea');
    copyElement.style.position = 'fixed';
    copyElement.style.left = '0';
    copyElement.style.top = '0';
    copyElement.style.opacity = '0';
    copyElement.value = value;
    document.body.appendChild(copyElement);
    copyElement.focus();
    copyElement.select();
    document.execCommand('copy');
    document.body.removeChild(copyElement);
  }

  copyChallengeLink(): void {
    this.copy(this.rankHelper.getChallengeLink());
  }

}
