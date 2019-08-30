import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// export const RECAPTCHA_CLIENT_KEY = '6LcQQKoUAAAAAG1aESUAwFem7nCa_PsVmLgGJ4Fe';
export const RECAPTCHA_CLIENT_KEY = '6Ldx3qwUAAAAAJmHq-rZhKlsTUwn6HNmJVLKnm_F';
export const BASE_URL = 'http://68.183.123.0:1323';

const mySwal = withReactContent(Swal);

export const alertSuccess = (message: string) =>
  mySwal.fire({
    type: 'success',
    title: message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

export const alertWarning = (message: string) =>
  mySwal.fire({
    type: 'warning',
    toast: true,
    title: message,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

export const alertError = (message: string) =>
  mySwal.fire({
    type: 'error',
    toast: true,
    title: message,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
