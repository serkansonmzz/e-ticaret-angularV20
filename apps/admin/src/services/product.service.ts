import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ProductModel } from '../pages/products/products';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);
  readonly products = signal<ProductModel[]>([]);

  load() {
    this.http
      .get<ProductModel[]>('http://localhost:3000/products')
      .subscribe({
        next: (p) => this.products.set(p),
        error: () => this.toast.show('Failed to load products', 'danger'),
      });
  }

  create(product: Omit<ProductModel, 'id'>) {
    return this.http
      .post<ProductModel>('http://localhost:3000/products', product)
      .subscribe({
        next: () => {
          this.toast.show('Product created', 'success');
          this.load();
        },
        error: () => this.toast.show('Create failed', 'danger'),
      });
  }

  update(product: ProductModel) {
    return this.http
      .put(`http://localhost:3000/products/${product.id}`, product)
      .subscribe({
        next: () => {
          this.toast.show('Product updated', 'success');
          this.load();
        },
        error: () => this.toast.show('Update failed', 'danger'),
      });
  }

  remove(id: number) {
    return this.http
      .delete(`http://localhost:3000/products/${id}`)
      .subscribe({
        next: () => {
          this.toast.show('Product deleted', 'success');
          this.load();
        },
        error: () => this.toast.show('Delete failed', 'danger'),
      });
  }
}
