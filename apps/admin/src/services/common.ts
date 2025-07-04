import { Injectable } from '@angular/core';
import { brandCrumbModel } from '../pages/layouts/breadcrumb/breadcrumb';

@Injectable({
  providedIn: 'root',
})
export class Common {
  data: brandCrumbModel[] = [];

  set(data: brandCrumbModel[]) {
    const val: brandCrumbModel = {
      title: 'Home',
      icon: 'home',
      url: '/',
    };
    this.data = data;
    this.data.unshift(val);
  }
}
