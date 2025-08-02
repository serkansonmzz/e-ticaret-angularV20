import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
  inject,
  AfterViewInit,
} from '@angular/core';
import { brandCrumbModel } from '../pages/layouts/breadcrumb/breadcrumb';
import { Common } from '../services/common';

@Component({
  selector: 'app-blank',
  imports: [],
  template: ` <title>e-Ticaret Admin | {{ pageTitle() }}</title> `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Blank implements AfterViewInit {
  readonly pageTitle = input<string>();
  readonly breadcrums = input.required<brandCrumbModel[]>();

  readonly #common = inject(Common);

  ngAfterViewInit(): void {
    this.#common.set(this.breadcrums());
  }

}
