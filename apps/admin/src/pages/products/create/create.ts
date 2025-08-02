import { HttpClient } from '@angular/common/http';
//import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  resource,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FlexiToastService } from 'flexi-toast';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Blank from 'apps/admin/src/components/blank';
import { lastValueFrom } from 'rxjs';
import { initialProduct, ProductModel } from '../products';

@Component({
  imports: [Blank, FormsModule],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Create {
  readonly id = signal<string | undefined>(undefined);

  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
      const res = await lastValueFrom(
        this.#http.get<ProductModel>(
          `http://localhost:3000/products/${this.id()}`
        )
      );
      return res;
    },
  });

  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);
  readonly #toast = inject(FlexiToastService);
  readonly #activate = inject(ActivatedRoute);
  //readonly #location = inject(Location);

  readonly data = linkedSignal(() => this.result.value() ?? initialProduct);
  readonly cardTitle = computed(() =>
    this.id() ? 'Update Product' : 'Add Product'
  );
  readonly btnName = computed(() => (this.id() ? 'Update' : 'Add'));

  constructor() {
    this.#activate.params.subscribe((res) => {
      if (res['id']) {
        this.id.set(res['id']);
      }
    });
  }

  save(form: NgForm) {
    if (!form.valid) return;

    if (!this.id()) {
      this.#http
        .post('http://localhost:3000/products', this.data())
        .subscribe(() => {
          this.#router.navigateByUrl('/products');
          //this.#location.back(); //bir öncesi sayfaya işlem sonrası dönmeni sağlıyor
          this.#toast.showToast(
            'Başarılı',
            'Test deneme başarlı ürün eklendi diyelim',
            'success'
          );
        });
    } else {
      this.#http
        .post(`http://localhost:3000/products/${this.id()}`, this.data())
        .subscribe(() => {
          this.#router.navigateByUrl('/products');
          //this.#location.back(); //bir öncesi sayfaya işlem sonrası dönmeni sağlıyor
          this.#toast.showToast(
            'Başarılı',
            'Test deneme başarılı ürün güncelleme',
            'success'
          );
        });
    }
  }
}
