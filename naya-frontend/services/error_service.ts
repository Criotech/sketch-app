import { AxiosError } from 'axios';

export function catchAxiosError(err: any): string {
  let message =
    'Something happened in setting up the request that triggered an Error';

  if (err.response) {
    message = err.response.data.message;
  } else if (err.request) {
    message = 'The request was made, but no response was received';
  }
  return message;
}
