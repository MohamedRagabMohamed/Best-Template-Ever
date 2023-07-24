import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Menus } from './menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isMenuOpen?: FormControl;
  isSubMenuOpen: boolean = false;
  menu = Menus;
  constructor(private router: Router) {}
  addedClasses(item: any): string {
    let classes = '';
    console.log(this.router.url);
    classes += item.spacing ? 'mt-8' : 'mt-2';
    classes += item.link === this.router.url ? ' active' : ' unactive';
    return classes;
  }
}
