import { Injectable } from '@angular/core';
import * as swal from 'sweetalert';

@Injectable()
export class AlertService {

  constructor() {
  }

  info(message) {
    console.log(message);
    return swal('Info', message, 'info');
  }

  success(message) {
    console.log(message);
    return swal('Success', message, 'success');
  }

  warning(message) {
    console.warn(message);
    return swal('Warning', message, 'warning');
  }

  error(message) {
    console.error(message);
    return swal('Error', message, 'error');
  }

}
