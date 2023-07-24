import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isDarkEnable?: FormControl;
  @Input() isMenuOpen?: FormControl;
  @Output() changeMenuOpen = new EventEmitter<boolean>();
  constructor() {}

  changeTheme() {
    this.isDarkEnable?.setValue(!this.isDarkEnable?.value);
  }

  changeMenuStatus() {
    this.isMenuOpen?.setValue(!this.isMenuOpen?.value);
    this.changeMenuOpen.emit(this.isMenuOpen?.value);
  }
}
