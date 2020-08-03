import tippy from 'tippy.js';

export class SurveyTooltip {
  static createTooltips(survey: any) {
    SurveyTooltip.create(survey, "financnaRezervaMesacne", "rezervu", "Peniaze, ktoré si odkladáš tzv. \"na horšie časy\".");
    SurveyTooltip.create(survey, "meno", "Monteste", "Test, v ktorom za 15minút zistíš úroveň svojej finančnej inteligencie a dostaneš odporúčania namieru ako pracovať s peniazmi efektívnejšie.");
    SurveyTooltip.create(survey, "konzervativneInvesticie", "konzervatívne produkty", "Zarábaju menej, ale vieš si z nich bez rizika vybrať peniaze v kratšej dobe.");
    SurveyTooltip.create(survey, "dynamickeInvesticie", "dynamické investičné produkty", "Zarábaju menej, ale vieš si z nich bez rizika vybrať peniaze v kratšej dobe.");


    
    // tooltip na hodnosti pri challengelinku je rieseny v metode checkChallengeLink() v survey.ts

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
          innerHTML = innerHTML.slice(0, indexFirst) + "<span class='tooltip-link' data-tippy-content='" + tooltipText + "'>" + innerHTML.slice(indexFirst);

          titleElement.innerHTML = innerHTML;
        }
      }
    }
  }
}