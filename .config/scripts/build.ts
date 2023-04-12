import * as esbuild from 'esbuild';
import {cwd} from './cwd';

await esbuild.build({
  entryPoints: ['app/index.ts'],
  bundle: true,
  platform: 'node',
  packages: 'external',
  outfile: cwd('./build/server.js'),
  tsconfig: cwd('./tsconfig.json'),
  alias: {
    '~': cwd('./app'),
    '@remix-build': cwd('./build'),
  },
});
