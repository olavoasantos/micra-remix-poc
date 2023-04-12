import {readFileSync, writeFileSync} from 'fs-extra';
import glob from 'fast-glob';
import {join} from 'node:path';

export function cwd(...parts: string[]) {
  return join(process.cwd(), ...parts);
}

writeFileSync(
  cwd('prisma', 'schema.prisma'),
  glob
    .sync(cwd('app/**/*.prisma'))
    .map((path) => readFileSync(path, 'utf-8'))
    .join('\n'),
);
