import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView: boolean;

  constructor(private routerService: RouterService) {
    this.isNoteView = true;
  }

  switchView() {
    const currentUrl = window.location.href;
    if(currentUrl.indexOf('noteview') > -1) {
      this.isNoteView = false;
      this.routerService.routeToListView();
    } else {
      this.isNoteView = true;
      this.routerService.routeToNoteView();
    }
  }
}