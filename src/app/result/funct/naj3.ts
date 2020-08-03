import * as najorder from '../../json/naj3Order.json';

export class ResultNaj3 {
  static naj3_manualne: string[] = [];

  constructor() { }

  static calculate(data: any): void {
    // good
    var countGood = 0;
    for (let i = 0; countGood < 3 && i < najorder.good.length; i++) {
      const entry = najorder.good[i];

      if (ResultNaj3.naj3_manualne.indexOf(entry) != -1) {
        this.showElementsByClass(entry);
        countGood++;
        continue;
      }

      for (var value in data) {
        const answer = data[value];
        if (typeof answer == 'string') {
          if (entry.endsWith(answer)) {
            this.showElementsByClass(entry);
            countGood++;
            break;
          }
        }
      }
    }

    // bad
    var countBad = 0;
    for (let i = 0; countBad < 3 && i < najorder.bad.length; i++) {
      const entry = najorder.bad[i];

      if (ResultNaj3.naj3_manualne.indexOf(entry) != -1) {
        this.showElementsByClass(entry);
        countBad++;
        continue;
      }

      for (var value in data) {
        const answer = data[value];
        if (typeof answer == 'string') {
          if (entry.endsWith(answer)) {
            this.showElementsByClass(entry);
            countBad++;
            break;
          }
        }
      }
    }

    // help
    var countHelp = 0;
    for (let i = 0; i < najorder.help.length; i++) {
      const entry = najorder.help[i];

      // if (ResultNaj3.naj3_manualne.indexOf(entry) != -1) {
      //   this.showElementsByClass(entry);
      //   countHelp++;
      //   continue;
      // }

      for (var value in data) {
        const answer = data[value];
        if (typeof answer == 'string') {
          if (entry.endsWith(answer)) {
            var className = entry;
            if (countHelp >= 3) className += " checkbox";
            this.showElementsByClass(className);
            countHelp++;
            break;
          }
        }
      }
    }
  }

  private static showElementsByClass(c: string) {
    var elements = document.getElementsByClassName(c);
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      element.removeAttribute("hidden");
      (<HTMLElement>element).style.display = "block";
    }
  }
}
