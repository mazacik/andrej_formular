import { QuestionID } from 'src/app/enum/question-id.enum';
import * as Survey from 'survey-angular';
import tippy from 'tippy.js';

export class TooltipHelper {
  public create(survey: Survey.SurveyModel) {
    setTimeout(() => {
      const komplexne: string = 'komplexne';
      this.insert(survey, QuestionID.majetokBytDomPoistenie, komplexne);
      
      tippy('#tippy-' + komplexne, {
        maxWidth: 'none',
        placement: 'auto',
        theme: 'light',
        content: 'Na to aby bolo poistenie spravené kompelxne, musí obsahovať všetky 3 pripoistenia a byť poistené do aktuálnej výšky nehnuteľnosti:<br>1) Poistenie nehnuteľnosti: veci pevne späté s nehnuteľnosťou - okná, múry...<br>2) Poistenie domácnosti: spotrebiče, cennosti, nábytok.<br>3) Poistenie zodpovednosti: poistenie v prípade poškodenia 3tích osôb.',
        trigger: 'mouseenter',
        duration: [500, 500],
        animation: 'shift-away',
        allowHTML: true
      });

      const prijem: string = 'príjem';
      this.insert(survey, QuestionID.vyskaPrijmu, prijem);
      
      tippy('#tippy-' + prijem, {
        maxWidth: 'none',
        placement: 'auto',
        theme: 'light',
        content: 'Peniaze, ktoré Ti chodia na účet alebo "na ruku".',
        trigger: 'mouseenter',
        duration: [500, 500],
        animation: 'shift-away',
        allowHTML: true
      });
    }, 100);
  }

  private insert(survey: Survey.SurveyModel, questionID: QuestionID, word: string): void {
    if (survey.currentPage.getQuestionByName(questionID)) {
      var titleElement = $('.sv_q_title').children('span')[0];
      if (titleElement) {
        var innerHTML = titleElement.innerHTML;

        var indexFirst = innerHTML.indexOf(word);
        var indexLast = indexFirst + word.length;

        if (indexFirst >= 0) {

          const icon = '<i class="fas fa-info-circle"></i>';
          innerHTML = innerHTML.slice(0, indexLast) + icon + '</span>' + innerHTML.slice(indexLast);
          innerHTML = innerHTML.slice(0, indexFirst) + '<span id="tippy-' + word + '" class="tippy-source">' + innerHTML.slice(indexFirst);

          titleElement.innerHTML = innerHTML;
        }
      }
    }
  }
}