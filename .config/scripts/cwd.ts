import {join} from 'node:path';
export function cwd(...path: string[]) {
  return join(process.cwd(), ...path);
}
