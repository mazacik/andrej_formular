export class ToggleElement {
  static create(id: string, title: string, content: string, points: number = -1, divSuffix: string = "") {
    // check if div exists
    var divClass = id + divSuffix;
    var divs = document.getElementsByClassName(divClass);
    for (let i = 0; i < divs.length; i++) {
      const div = divs[i];
      // check if found node is a div
      if (div.innerHTML == "") {
        // toggle button
        var buttonToggle = document.createElement("i");
        buttonToggle.classList.add("arrow", "down");
        buttonToggle.setAttribute("name", id);
        buttonToggle.onclick = () => {
          var element = document.getElementById(id + "Content");
          if (element) if (element.hasAttribute("hidden")) {
            element.removeAttribute("hidden");
          } else {
            element.hidden = true;
          }
        }

        // points
        if (points >= 0) {
          var spanPoints = document.createElement("span");
          spanPoints.innerHTML = " [-" + points.toString() + "b] ";
        }

        // title
        var bTitle = document.createElement("b");
        bTitle.innerHTML = title;
        var pTitle = document.createElement("p");
        pTitle.appendChild(buttonToggle);
        if (spanPoints) pTitle.appendChild(spanPoints);
        pTitle.appendChild(bTitle);

        // content
        var pContent = document.createElement("p");
        pContent.id = id + "Content";
        pContent.setAttribute("hidden", "true");
        pContent.innerHTML = content;

        // div
        div.appendChild(pTitle);
        div.appendChild(pContent);
        div.removeAttribute("hidden");
      }
    }
  }
  static createFromAnswer(answer: any) {
    ToggleElement.create(answer.id, answer.resultTitle, answer.resultVysvetlenie, answer.resultPointsStratil);
  }
}