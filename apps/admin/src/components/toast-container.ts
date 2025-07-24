import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { ToastService, ToastType } from '../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [NgFor, NgClass],
  template: `
    <div class="alert-top-right">
      <div
        *ngFor="let msg of messages()"
        class="animated-alert"
        [ngClass]="'custom-alert-' + msg.type"
      >
        <div class="custom-alert-content">
          <div class="custom-alert-icon">
            <span class="material-symbols-outlined">{{ icon(msg.type) }}</span>
          </div>
          <div class="custom-alert-text">{{ msg.text }}</div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ToastContainer {
  readonly #service = inject(ToastService);
  readonly messages = computed(() => this.#service.messages());

  icon(type: ToastType) {
    switch (type) {
      case 'success':
        return 'check_circle';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'error';
      default:
        return 'info';
    }
  }
}
