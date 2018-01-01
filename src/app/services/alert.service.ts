import { Injectable } from '@angular/core';
import * as swal from 'sweetalert';

@Injectable()
export class AlertService {

  constructor() {
  }

  info(message) {
    console.log(message);
    swal('Info', message, 'info');
  }

  success(message) {
    console.log(message);
    swal('Success', message, 'success');
  }

  warning(message) {
    console.warn(message);
    swal('Warning', message, 'warning');
  }

  error(message) {
    console.error(message);
    swal('Error', message, 'error');
  }

}
