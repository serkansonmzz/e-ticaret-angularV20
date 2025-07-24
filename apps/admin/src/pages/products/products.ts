import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
  inject,
  OnInit,
} from '@angular/core';
import Blank from '../../components/blank';
import { FlexiGridFilterDataModel, FlexiGridModule } from 'flexi-grid';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

export interface ProductModel {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  categoryId: number;
  categoryName: string;
}

@Component({
  imports: [Blank, FlexiGridModule, RouterLink],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Products implements OnInit {
  readonly service = inject(ProductService);

  ngOnInit() {
    this.service.load();
  }

  readonly data = computed(() => this.service.products());
  readonly loading = computed(() => false);

  readonly categoryFilter = signal<FlexiGridFilterDataModel[]>([
    {
      name: 'Cell Phone',
      value: 'Cell Phone',
    },
  ]);

  edit(product: ProductModel) {
    // navigate to edit page or open a modal
  }

  delete(product: ProductModel) {
    this.service.remove(product.id);
  }
}
