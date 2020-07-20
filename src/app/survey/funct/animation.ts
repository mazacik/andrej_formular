export class SurveyAnimation {
  constructor(survey: any) {
    let doAnimation = true;
    const animationSpeed = 400;
    const $toAnimate = $('.sv_body > div:first-child');
    let animateNext = false;
    survey.onCurrentPageChanging.add((sender, options) => {
      if (!doAnimation) { return; }
      options.allowChanging = false;
      animateNext = sender.currentPage.visibleIndex > options.newCurrentPage.visibleIndex
      setTimeout(() => {
        doAnimation = false;
        sender.currentPage = options.newCurrentPage;
        doAnimation = true;
        $toAnimate.css('transition', 'none');
      }, animationSpeed);
      $toAnimate.css({
        transform: 'translateY(' + (animateNext ? '+' : '-') + '100vh)',
      });
    });

    survey.onCurrentPageChanged.add(() => {
      $('.sv_body > div:first-child').css({
        transform: 'translateY(' + (animateNext ? '-' : '+') + '100vh)',
      });
      setTimeout(() => {
        $toAnimate.css('transition', 'all .4s');
        $toAnimate.css({
          transform: 'translateY(0px)',
        });
      }, 0);
    });
  }
}