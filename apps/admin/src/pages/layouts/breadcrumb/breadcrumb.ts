import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Common } from '../../../services/common';

export interface brandCrumbModel {
  title: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Breadcrumb {
  readonly #common = inject(Common);
  readonly data = computed(() => this.#common.data);
}
