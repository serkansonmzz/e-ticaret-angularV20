import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import Blank from '../../components/blank';
import { FlexiGridModule } from 'flexi-grid';
import { signal } from '@angular/core';

export interface ProductModel {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
}

@Component({
  imports: [Blank, FlexiGridModule],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Products {
  readonly data = signal<ProductModel[]>([
    {
      id: 1,
      name: 'Ürün 1',
      imageUrl: 'https://via.placeholder.com/50',
      price: 100,
      stock: 10,
    },
    {
      id: 2,
      name: 'Ürün 2',
      imageUrl: 'https://via.placeholder.com/50',
      price: 200,
      stock: 5,
    },
    {
      id: 3,
      name: 'Ürün 3',
      imageUrl: 'https://via.placeholder.com/50',
      price: 150,
      stock: 20,
    },
  ]);
}
