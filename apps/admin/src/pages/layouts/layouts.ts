import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import Breadcrumb from './breadcrumb/breadcrumb';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { navigations } from '../../navigation';
import { NavPipe } from '../../pipes/nav-pipe';
import { DatePipe } from '@angular/common';

@Component({
  imports: [
    Breadcrumb,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    NavPipe,
    DatePipe,
  ],
  templateUrl: './layouts.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Layouts {
  readonly search = signal<string>('');
  readonly time = signal<Date | string>('');
  readonly navigations = computed(() => navigations);

  constructor() {
    setInterval(() => {
      this.time.set(new Date());
    }, 1000);
  }
}
