import { HttpClient } from '@angular/common/http';
//import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Blank from 'apps/admin/src/components/blank';

@Component({
  imports: [Blank, FormsModule],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Create {
  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);
  //readonly #location = inject(Location);

  save(form: NgForm) {
    if (!form.valid) return;

    this.#http
      .post('http://localhost:3000/products', form.value)
      .subscribe(() => {
        this.#router.navigateByUrl('/products');
        //this.#location.back(); //bir öncesi sayfaya işlem sonrası dönmeni sağlıyor
      });
  }
}
