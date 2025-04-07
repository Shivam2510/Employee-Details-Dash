import { Component, computed, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private router = inject(Router);
  private currentRoute = signal(this.router.url);

  // Update signal on route change
  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute.set(event.urlAfterRedirects);
      });
  }

  // Computed signal to derive title
  protected readonly title = computed(() => {
    const path = this.currentRoute();
    if (path.includes('employee-details')) return 'Add Employee Details';
    return 'Employee Details';
  });
}
