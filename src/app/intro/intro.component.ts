import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css', '../result/result.component.css']
})
export class IntroComponent implements OnInit {

  name: string;
  rank: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];

    var url_rank = this.route.snapshot.params['rank'];
    if (url_rank) {
      if (url_rank == "FinancnaLegenda") {
        this.rank = "Finančná legenda";
      } else if (url_rank == "FinancnaHviezda") {
        this.rank = "Finančná hviezda";
      } else if (url_rank == "FinancnyKuzelnik") {
        this.rank = "Finančný kúzelník";
      } else if (url_rank == "FinancnyProfesor") {
        this.rank = "Finančný profesor";
      } else if (url_rank == "FinancnyMajster") {
        this.rank = "Finančný majster";
      } else if (url_rank == "FinancnyUcen") {
        this.rank = "Finančný učeň";
      } else if (url_rank == "FinancnyJunior") {
        this.rank = "Finančný junior";
      } else if (url_rank == "FinancnyNovacik") {
        this.rank = "Finančný nováčik";
      } else if (url_rank == "FinancnyZaciatocnik") {
        this.rank = "Finančný začiatočník";
      } else if (url_rank == "FinancneEmbryo") {
        this.rank = "Finančné embryo";
      }
    }

    if (this.name && this.rank) {
      document.getElementById("divStandard").setAttribute("hidden", "true");
      document.getElementById("divChallenge").removeAttribute("hidden");
    }
  }
}
