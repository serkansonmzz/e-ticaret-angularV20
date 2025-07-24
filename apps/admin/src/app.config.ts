import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { errorInterceptor } from './interceptors/error.interceptor';

registerLocaleData(localeTr); //belli şeyleri local diline getiriyor örneğin saat gösterimi..

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useValue: errorInterceptor, multi: true },
    provideRouter(appRoutes),
    { provide: LOCALE_ID, useValue: 'tr' },
  ],
};
