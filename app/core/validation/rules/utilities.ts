import type {TypeGuardContext} from '../types';

export function get(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export function getTopContext(context: TypeGuardContext<any>) {
  let topContext = context;
  while (topContext.context) {
    topContext = topContext.context;
  }

  return topContext;
}
