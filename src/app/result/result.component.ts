import { Component, OnInit } from '@angular/core';
import { Survey } from 'survey-angular';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  test: String = '';

  constructor() { }

  ngOnInit(): void {
    // this.test = sessionStorage.getItem('points');
    this.test = (<any>window).survey.data;
  }

}
