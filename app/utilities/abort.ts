import {json} from '@remix-run/node';
import {STATUS_CODES} from './http';

export function abort(
  status: keyof typeof STATUS_CODES,
  message = STATUS_CODES[status],
  init?: Omit<ResponseInit, 'status'>,
) {
  return json({message}, {...init, status: Number(status)});
}
