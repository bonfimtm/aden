import { Component, OnInit } from '@angular/core';
import * as slug from 'slug/slug.js';

@Component({
  selector: 'app-admin-post-list',
  templateUrl: './admin-post-list.component.html',
  styleUrls: ['./admin-post-list.component.css']
})
export class AdminPostListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // console.log(slug('i ♥ unicode'));
  }

}
