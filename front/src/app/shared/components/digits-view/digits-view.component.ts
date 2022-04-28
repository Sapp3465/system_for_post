import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-email',
  templateUrl: './digits-view.component.html',
  styleUrls: [ './digits-view.component.scss' ]
})
export class DigitsViewComponent implements OnInit{

  public code ?: string;

  constructor(private activatedRoute : ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.paramMap.get('code')?.slice(0,6);
  }
}
