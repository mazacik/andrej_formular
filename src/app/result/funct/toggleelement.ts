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
        buttonToggle.classList.add("arrow-more", "fa", "fa-arrow-right");
        buttonToggle.setAttribute("name", id);
        buttonToggle.onclick = (event) => {
          let $button = $(event.target);

          var contentElements = document.getElementsByClassName(id + "Content");
          for (let i = 0; i < contentElements.length; i++) {
            const element = contentElements[i];
            if (element.hasAttribute("hidden")) {
              element.removeAttribute('hidden');
  
              $button.removeClass('fa-arrow-right');
              $button.addClass('fa-arrow-down');
            } else {
              (<any>element).hidden = true;
  
              $button.addClass('fa-arrow-right');
              $button.removeClass('fa-arrow-down');
            }
          }
        }

        // points
        if (points >= 0) {
          var spanPoints = document.createElement("span");
          spanPoints.innerHTML = "<span class='points'>-" + points.toString() + "b</span> ";
        }

        // title
        var bTitle = document.createElement("b");
        bTitle.innerHTML = title;
        var pTitle = document.createElement("p");
        if (spanPoints) pTitle.appendChild(spanPoints);
        pTitle.appendChild(bTitle);
        pTitle.appendChild(buttonToggle);

        // content
        var pContent = document.createElement("p");
        pContent.classList.add(id + "Content");
        pContent.classList.add("explanation");
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
