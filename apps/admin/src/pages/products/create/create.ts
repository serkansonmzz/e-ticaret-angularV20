import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Blank from 'apps/admin/src/components/blank';
import { ProductService } from '../../services/product.service';

@Component({
  imports: [Blank, FormsModule],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Create {
  readonly #router = inject(Router);
  readonly #service = inject(ProductService);

  model = {
    name: '',
    imageUrl: '',
    price: 0,
    stock: 0,
  };

  save(form: NgForm) {
    if (!form.valid) return;

    this.#service.create(this.model);
    this.#router.navigateByUrl('/products');
  }
}
