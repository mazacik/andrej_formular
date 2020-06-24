import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  data = (<any>window).survey.data;

  test: String = '';

  constructor() { }

  ngOnInit(): void {
    this.test = JSON.stringify(this.data);
  }

}
