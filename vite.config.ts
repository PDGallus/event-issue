import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'istanbul',
      exclude: ['**/*.js', '**/*.{c,m}js', '**/*.{types,test,stories,config}.ts', '**/index.ts', '.storybook/**'],
    },
  },
});
