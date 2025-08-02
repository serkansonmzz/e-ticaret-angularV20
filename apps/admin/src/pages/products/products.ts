import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import Blank from '../../components/blank';
import { FlexiGridFilterDataModel, FlexiGridModule } from 'flexi-grid';
import { signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';

export interface ProductModel {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  categoryId: number;
  categoryName: string;
}

export const initialProduct: ProductModel = {
  id: '',
  name: '',
  imageUrl: '',
  price: 0,
  stock: 0,
  categoryId: 123,
  categoryName: 'Telefon',
};

@Component({
  imports: [Blank, FlexiGridModule, RouterLink],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Products {
  readonly result = httpResource<ProductModel[]>(
    () => 'http://localhost:3000/products'
  );
  readonly data = computed(() => this.result.value() ?? []);
  readonly loading = computed(() => this.result.isLoading());
  readonly #toast = inject(FlexiToastService);
  readonly #http = inject(HttpClient);

  readonly categoryFilter = signal<FlexiGridFilterDataModel[]>([
    {
      name: 'Cell Phone',
      value: 'Cell Phone',
    },
  ]);

  delete(id: string) {
    this.#toast.showSwal(
      'Ürünü Sil?',
      'Ürünü silmek istiyor musun?',
      'Sil',
      () => {
        this.#http
          .delete(`http://localhost:3000/products${id}`)
          .subscribe(() => {
            this.result.reload();
          });
      }
    );
  }
}
