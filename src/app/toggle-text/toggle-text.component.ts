import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'toggle-text',
  templateUrl: './toggle-text.component.html',
  styleUrls: ['./toggle-text.component.css']
})
export class ToggleTextComponent implements OnInit {

  @Input() titleText: string;
  @Input() contentText: string;

  constructor() { }

  ngOnInit(): void {

  }

  toggleContent(): void {
    var element = document.getElementById("contentElement");
    if (element) if (element.hasAttribute("hidden")) {
      element.removeAttribute("hidden");
    } else {
      element.hidden = true;
    }
  }

}
