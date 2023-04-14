import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from "ngx-bootstrap/dropdown";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'] ,
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true }
    }
  ]
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  constructor() { }

  ngOnInit() {
  }

}
