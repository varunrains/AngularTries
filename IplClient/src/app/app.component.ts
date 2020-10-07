import { Component } from '@angular/core';
import { HeaderService } from './header/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private headerService: HeaderService) {}

  onCloseSideNav() {
    this.headerService.onClickOfBody();
  }
}
