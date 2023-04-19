import { Router } from '@angular/router';
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
  constructor(private router: Router) { }

  ngOnInit() {
  }

  showMenu():boolean
  {
    return this.router.url != '/user/login'
  }

}
