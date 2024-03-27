import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { ValidationService } from './validation-service';
import { UtilsService } from './utils-service';
/**
 * Basic Component
 */

export class BaseComponent {
  currentYear: number;
  lang = 'en';
  breadCrumbItems: any[] = [];
  motTextArray: any[] = [];
  _cookieService!: CookieService;
  _translate: TranslateService;
  _utilsService!: UtilsService;
  _validationService!: ValidationService;
  constructor(private injector: Injector) {
    this.currentYear = new Date().getFullYear();
    this._cookieService = this.injector.get(CookieService);
    this._utilsService = this.injector.get(UtilsService);
    this._validationService = this.injector.get(ValidationService);
    this._translate = this.injector.get(TranslateService);
    this.lang = this._cookieService.get('lang') ? this._cookieService.get('lang') : 'en';
    this._translate.setDefaultLang(this.lang);
  }
  successmsg(title: string, text: string) {
    Swal.fire({
      title: this._translate.instant(title),
      text: this._translate.instant(text),
      icon: 'success',
      showCancelButton: false,
      timer: 4000,
      timerProgressBar: true,
      confirmButtonColor: '#364574',
      confirmButtonText: 'OK'
    });
  }
  errormsg(title: string, text: string) {
    Swal.fire({
      title: this._translate.instant(title),
      text: this._translate.instant(text),
      icon: 'error',
      timer: 4000,
      timerProgressBar: true,
      showCancelButton: false,
      confirmButtonColor: '#364574',
      confirmButtonText: 'OK'
    });
  }

  setBreadCrumbItems(...args: any[]) {
    this._translate.get('init').subscribe(() => {
      args.forEach((elem, idx, array) => {
        this.breadCrumbItems.push({ label: this._translate.instant(elem), active: idx == array.length - 1 }); //set active: true in the last one
      });
    })
  }
  translateValue(value: string): Promise<string | undefined> {
    return new Promise((resolve) => {
      this._translate.get('init').subscribe(() => {
        const translatedValue = this._translate.instant(value);
        resolve(translatedValue);
      });
    });
  }
}