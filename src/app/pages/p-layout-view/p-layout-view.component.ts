import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-p-layout-view',
  imports: [CommonModule, RouterOutlet,],
  templateUrl: './p-layout-view.component.html',
  styleUrl: './p-layout-view.component.css'
})

export class PLayoutViewComponent {
  isCollapsed = false;
  activeMenuName = 'Dashboard';
  drawerOpen = false;

  private mediaQuery!: MediaQueryList;

  constructor(private router: Router) { }



  ngOnInit(): void {
    this.mediaQuery = window.matchMedia('(max-width: 768px)');
  }

  ngOnDestroy(): void {
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener('change', () => { });
    }
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }
  closeDrawer() {
    this.drawerOpen = false;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  onScrollEvent(e: Event) {
    console.log(e);
  }
}
