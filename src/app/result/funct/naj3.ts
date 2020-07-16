import * as naj3Order from '../../json/naj3Order.json';
import * as sCimTiViemePomoctOrder from '../../json/sCimViemePomoctOrder.json';

export class ResultNaj3 {
  static naj3_manualne: string[] = [];

  constructor() { }

  static calculate(data: any): void {
    // top 3 najlepsie
    var najlepsiePocet = 0;
    for (let i = 0; i < naj3Order.najlepsie.length; i++) {
      if (najlepsiePocet == 3) break;
      const entry = naj3Order.najlepsie[i];
      var found = false;
      for (let j = 0; j < ResultNaj3.naj3_manualne.length; j++) {
        const extra = ResultNaj3.naj3_manualne[j];
        if (entry == extra) {
          this.showElementsByClass(entry);
          found = true;
          najlepsiePocet++;
          break;
        }
      }

      if (!found) {
        for (var value in data) {
          var answer = data[value];
          if (typeof answer == 'string') {
            if (entry.endsWith(answer)) {
              this.showElementsByClass(entry);
              najlepsiePocet++;
              break;
            }
          }
        }
      }
    }

    // top 3 najhorsie
    var najhorsiePocet = 0;
    for (let i = 0; i < naj3Order.najhorsie.length; i++) {
      if (najhorsiePocet == 3) break;
      const entry = naj3Order.najhorsie[i];
      var found = false;
      for (let j = 0; j < ResultNaj3.naj3_manualne.length; j++) {
        const extra = ResultNaj3.naj3_manualne[j];
        if (entry == extra) {
          this.showElementsByClass(entry);
          found = true;
          najhorsiePocet++;
          break;
        }
      }

      if (!found) {
        for (var value in data) {
          var answer = data[value];
          if (typeof answer == 'string') {
            if (entry.endsWith(answer)) {
              this.showElementsByClass(entry);
              najhorsiePocet++;
              break;
            }
          }
        }
      }
    }

    // top 3 s cim ti vieme pomoct
    var sCimTiViemePomoctPocet = 0;
    for (let i = 0; i < sCimTiViemePomoctOrder.priority.length; i++) {
      if (sCimTiViemePomoctPocet == 3) break;
      const entry = sCimTiViemePomoctOrder.priority[i];
      var found = false;
      // for (let j = 0; j < naj3Extra.length; j++) {
      //   const extra = naj3Extra[j];
      //   if (entry == extra) {
      //     this.showElementsByClass(entry);
      //     found = true;
      //     sCimTiViemePomoctPocet++;
      //     break;
      //   }
      // }

      if (!found) {
        for (var value in data) {
          var answer = data[value];
          if (typeof answer == 'string') {
            if (entry.endsWith(answer)) {
              this.showElementsByClass(entry);
              sCimTiViemePomoctPocet++;
              break;
            }
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
    }
  }
}
