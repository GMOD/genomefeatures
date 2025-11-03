import type { StorybookConfig } from '@storybook/html-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@chromatic-com/storybook'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  staticDirs: ['../data'],
}
export default config
