import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import ToastContainer from './components/toast-container';

@Component({
  imports: [RouterModule, ToastContainer],
  selector: 'app-root',
  template: `
    <router-outlet />
    <app-toast-container />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class App {}
