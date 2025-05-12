import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  isOpen?: boolean;

  constructor(private router: Router) {
  }
  showToggle() {
    let sidebar = document.querySelector(".sidebar");
    this.isOpen = sidebar?.classList.toggle('active');
  }

  ngOnInit() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/admin/dashboard')) {
      this.activeMenu = 'dashboard';
    } else if (currentUrl.includes('/admin/userss')) {
      this.activeMenu = 'user';
    } else {
      this.activeMenu = '';
    }
  }
  activeMenu: string = 'dashboard';

  goToMenu(route: any) {
    this.activeMenu = route;
    if (route === "dashboard") {
      this.router.navigate(['/admin/dashboard'])
    }
    if (route === "user") {
      this.router.navigate(['/admin/userss'])
    }
  }
}
