import { Injectable, signal } from '@angular/core';

export type ToastType = 'primary' | 'success' | 'warning' | 'danger';
export interface ToastMessage {
  id: number;
  text: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private counter = 0;
  readonly messages = signal<ToastMessage[]>([]);

  show(text: string, type: ToastType = 'primary') {
    const id = ++this.counter;
    this.messages.update((msgs) => [...msgs, { id, text, type }]);
    setTimeout(() => this.remove(id), 4000);
  }

  remove(id: number) {
    this.messages.update((msgs) => msgs.filter((m) => m.id !== id));
  }
}
