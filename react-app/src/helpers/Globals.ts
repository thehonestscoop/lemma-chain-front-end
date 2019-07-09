import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// export const RECAPTCHA_CLIENT_KEY = '6LcQQKoUAAAAAG1aESUAwFem7nCa_PsVmLgGJ4Fe';
export const RECAPTCHA_CLIENT_KEY = '6Ldx3qwUAAAAAJmHq-rZhKlsTUwn6HNmJVLKnm_F';
export const BASE_URL = 'http://68.183.123.0:1323';

const mySwal = withReactContent(Swal);
export const alertSuccess = (message: string) =>
  mySwal.fire({
    position: 'top-end',
    type: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500
  });
export const alertWarning = (message: string) =>
  mySwal.fire({
    position: 'top-end',
    type: 'warning',
    title: message,
    showConfirmButton: false,
    timer: 1500
  });
export const alertError = (message: string) =>
  mySwal.fire({
    position: 'top-end',
    type: 'error',
    title: message,
    showConfirmButton: false,
    timer: 1500
  });
