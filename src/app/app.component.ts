import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'best-template-ever';

  isDarkEnable = new FormControl(false);
  isMenuOpen = new FormControl(true);
  constructor() {}

  menu(open: boolean) {
    this.isMenuOpen.setValue(open);
  }
}
