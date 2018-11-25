import { Injectable } from '@angular/core';
import * as toastr from 'toastr/build/toastr.min.js';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() {
    toastr.options = {
      'closeButton': true,
      'debug': false,
      'newestOnTop': true,
      'progressBar': false,
      'positionClass': 'toast-top-right',
      'preventDuplicates': false,
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    };
  }

  info(message: string, title?: string) {
    console.log({ message, title });
    return toastr.info(message, title);
  }

  success(message: string, title?: string) {
    console.log({ message, title });
    return toastr.success(message, title);
  }

  warning(message: string, title?: string) {
    console.warn({ message, title });
    return toastr.error(message, title);
  }

  error(message: string, title?: string) {
    console.error({ message, title });
    return toastr.error(message, title);
  }
}
