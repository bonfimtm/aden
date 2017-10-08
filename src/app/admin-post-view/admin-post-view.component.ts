import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-post-view',
  templateUrl: './admin-post-view.component.html',
  styleUrls: ['./admin-post-view.component.css']
})
export class AdminPostViewComponent implements OnInit, OnDestroy {

  id: string;
  private subscription: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
