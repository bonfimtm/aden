import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-home',
  templateUrl: './public-home.component.html',
  styleUrls: ['./public-home.component.css']
})
export class PublicHomeComponent implements OnInit {
  
  title = 'Aden';

  constructor() { }

  ngOnInit() {
  }

}
