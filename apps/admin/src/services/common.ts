import { Injectable } from '@angular/core';
import { brandCrumbModel } from '../pages/layouts/breadcrumb/breadcrumb';

@Injectable({
  providedIn: 'root',
})
export class Common {
  readonly data: brandCrumbModel[] = [];

  set(title: string, url: string, icon: string) {
    this.data.splice(0); //bu satırı method öncesi datanın içini sıfırlamak için yaptık..readonly olduğu için direk boş array diyemedik olsun :)
    const val: brandCrumbModel = {
      title: title,
      url: url,
      icon: icon,
    };

    this.data.push(val);
  }
}
