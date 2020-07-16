export class SurveyKeyboardEvent {
  survey: any;

  constructor(survey: any) {
    this.survey = survey;
  }
  handle(event: KeyboardEvent) {
    var key = event.key;

    if (this.survey != null) {
      if (this.survey.currentPage.questions[0].getType() == "text" && this.survey.currentPage.questions[0].inputType != "text") {
        // question is a text input that only allows numbers
        if (key == "Enter" || key == "ArrowRight" || key == "ArrowDown") {
          var element = document.getElementById("surveyNextAlternative");
          if (element) element.focus;
        } else if (key == "ArrowUp" || key == "ArrowLeft") {
          event.preventDefault();
          this.survey.prevPage();
        }
      } else {
        if (key == "Enter" || key == "ArrowRight" || key == "ArrowDown") {
          event.preventDefault();
          this.survey.nextPage();
        } else if (key == "ArrowUp" || key == "ArrowLeft") {
          event.preventDefault();
          this.survey.prevPage();
        }
      }
    }
  }
}