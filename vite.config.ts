import {defineConfig} from 'vitest/config';
import {cwd} from './.config/scripts/cwd';

export default defineConfig({
  resolve: {
    alias: {
      '~': cwd('./app'),
      '@remix-build': cwd('./build'),
    },
  },
  test: {
    globals: true,
    coverage: {
      excludeNodeModules: true,
      reporter: ['json-summary'],
      reportsDirectory: 'coverage',
      exclude: ['.*.*'],
    },
  },
});
