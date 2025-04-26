import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isCartOpen: boolean = false
  cartCount = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({ disable: 'mobile', duration: 1200, });
      AOS.refresh();
      // this.changeSlide();
    }

  }
  index = 0; // Add this as a property of your component
  maxSlides = 2;
  changeSlide() {
    const slides = document.querySelectorAll(".hero-slide") as NodeListOf<HTMLElement>;

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    if (this.index < 0) {
      this.index = slides.length - 1;
    }

    if (this.index > slides.length - 1) {
      this.index = 0;
    }

    slides[this.index].style.display = "block";

    this.index++;
    if (this.index >= this.maxSlides) {
      return; // Stop recursion here
    }
    setTimeout(() => this.changeSlide(), 2000);
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
}
