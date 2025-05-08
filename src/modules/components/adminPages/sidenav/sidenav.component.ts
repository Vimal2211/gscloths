import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, CommonModule, MatTooltipModule],
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
    console.log('this.isOpen: ', this.isOpen);
  }



  goToMenu(route: any) {
    this.router.navigate([route])
  }
}
