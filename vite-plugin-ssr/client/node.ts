import { assertUsage } from './utils'
assertUsage(
  false,
  'The module `vite-plugin-ssr` cannot be imported in the browser. Did you mean to import the module `vite-plugin-ssr/client` instead?',
)
