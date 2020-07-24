import tippy from 'tippy.js';

export class SurveyTooltip {
  static createTooltips(survey: any) {
    SurveyTooltip.create(survey, "financnaRezervaMesacne", "rezervu", "Peniaze, ktoré si odkladáš tzv. \"na horšie časy\".");
    SurveyTooltip.create(survey, "meno", "Monteste", "Test, v ktorom za 15minút zistíš úroveň svojej finančnej inteligencie a dostaneš odporúčania namieru ako pracovať s peniazmi efektívnejšie.");


    
    // SurveyTooltip.create(survey, "id_otazky_2", "slovo_2", "tooltip_2");
    // SurveyTooltip.create(survey, "id_otazky_3", "slovo_3", "tooltip_3");
    tippy('[data-tippy-content]');
  }

  static create(survey: any, questionId: string, word: string, tooltipText: string): void {
    if (survey.currentPage.getQuestionByName(questionId) != null) {
      var titleElement = document.getElementsByClassName("sv_q_title").item(0);
      if (titleElement) {
        var innerHTML = titleElement.innerHTML;

        var indexFirst = innerHTML.indexOf(word);
        var indexLast = indexFirst + word.length;

        if (indexFirst >= 0) {
          innerHTML = innerHTML.slice(0, indexLast) + "</span>" + innerHTML.slice(indexLast);
          innerHTML = innerHTML.slice(0, indexFirst) + "<span data-tippy-content='" + tooltipText + "'>" + innerHTML.slice(indexFirst);

          titleElement.innerHTML = innerHTML;
        }
      }
    }
  }
}