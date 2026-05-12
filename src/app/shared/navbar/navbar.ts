import { Component, signal, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  private platformId = inject(PLATFORM_ID);
  protected readonly isDark = signal(false);

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.applyDark(true);
    } else if (saved === 'light') {
      this.applyDark(false);
    } else {
      // Lit la préférence système si rien de sauvegardé
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.applyDark(prefersDark);
    }
  }

  toggleTheme() {
    this.applyDark(!this.isDark());
    localStorage.setItem('theme', this.isDark() ? 'dark' : 'light');
  }

  private applyDark(dark: boolean) {
    this.isDark.set(dark);
    document.documentElement.classList.toggle('dark', dark);
  }
}