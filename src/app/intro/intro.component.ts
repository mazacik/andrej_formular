import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
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
      this.rank = decodeURIComponent(atob(this.route.snapshot.params['rank']));
    }

    if (this.name && this.rank) {
      document.getElementById("challenge").removeAttribute("hidden");
    }
  }
}
