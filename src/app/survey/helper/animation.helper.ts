import { SurveyModel } from "survey-angular";

export abstract class AnimationHelper {

  private static skip: boolean = false;
  private static animationSpeed: number = 400;

  public static onCurrentPageChanging(survey: SurveyModel, options: any): void {
    if (this.skip) return;

    options.allowChanging = false;
    const $toAnimate = $('.sv_p_root');
    $toAnimate.css('transform', 'translateX(' + (options.isNextPage ? '+' : '-') + '100vw)');

    setTimeout(() => {
      this.skip = true;
      survey.currentPage = options.newCurrentPage;
      this.skip = false;
      $toAnimate.css('transition', 'none');
    }, this.animationSpeed);
  }

  public static onCurrentPageChanged(isNextPage: boolean): void {

    const $toAnimate = $('.sv_p_root');
    $toAnimate.css('transform', 'translateX(' + (isNextPage ? '-' : '+') + '100vw)');

    setTimeout(() => {
      $toAnimate.css('transition', 'all .4s');
      $toAnimate.css('transform', 'translateX(0px)');
    });
  }

}
