import {redirect} from '@remix-run/node';

export function back(
  request: Request,
  {fallback, ...init}: ResponseInit & {fallback: string},
): Response {
  return redirect(request.headers.get('Referer') ?? fallback, init);
}
