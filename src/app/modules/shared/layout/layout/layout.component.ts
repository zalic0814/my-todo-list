import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  MediaMatcher,
} from '@angular/cdk/layout';

import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnDestroy {
  menus: { name: string; routerLink: string; icon: string }[] = [
    { name: 'All Tasks', routerLink: '', icon: 'list' },
    { name: 'Calendar', routerLink: '/calendar', icon: 'calendar_today' },
  ];

  destroy$ = new Subject<void>();
  isMobile$ = this.breakpointObserver.observe(['(max-width: 768px)']).pipe(
    takeUntil(this.destroy$),
    map((result) => result.matches),
  );

  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
