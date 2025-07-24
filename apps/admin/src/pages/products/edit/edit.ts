import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Blank from 'apps/admin/src/components/blank';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../products';

@Component({
  standalone: true,
  imports: [Blank, FormsModule],
  templateUrl: './edit.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Edit implements OnInit {
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #service = inject(ProductService);
  readonly #http = inject(HttpClient);

  data: ProductModel | null = null;

  ngOnInit(): void {
    const id = Number(this.#route.snapshot.paramMap.get('id'));
    this.#http
      .get<ProductModel>(`http://localhost:3000/products/${id}`)
      .subscribe((p) => (this.data = p));
  }

  save(form: NgForm) {
    if (!form.valid || !this.data) return;
    this.#service.update(this.data);
    this.#router.navigateByUrl('/products');
  }
}
