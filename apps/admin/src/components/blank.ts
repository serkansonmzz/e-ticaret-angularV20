import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-blank',
  imports: [],
  template: ` <title>e-Ticaret Admin | {{ pageTitle() }}</title> `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Blank {
  readonly pageTitle = input.required<string>();
}
