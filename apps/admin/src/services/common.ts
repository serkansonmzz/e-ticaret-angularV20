import { Injectable, signal } from '@angular/core';
import { brandCrumbModel } from '../pages/layouts/breadcrumb/breadcrumb';

@Injectable({
  providedIn: 'root',
})
export class Common {
  readonly data = signal<brandCrumbModel[]>([]);


  set(data: brandCrumbModel[]) {
    const val: brandCrumbModel = {
      title: 'Home',
      icon: 'home',
      url: '/',
    };
    this.data.set([val, ...data]); //val ı data elemanların başına ekliyor hepsini bir dizi haline getirip bırakıyor..objelerden dizi olmuş oluyor.
  }

}
