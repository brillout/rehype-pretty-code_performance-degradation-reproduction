import { Plugin } from 'vite'
import { assert, normalizePath, projectInfo } from '../utils'
import { isSSR_config } from './utils'

export { manifest }

function manifest(): Plugin {
  let base: string
  let ssr: boolean
  return {
    name: 'vite-plugin-ssr:manifest',
    apply: 'build',
    configResolved(config) {
      base = config.base
      ssr = isSSR_config(config)
    },
    generateBundle(_, bundle) {
      if (ssr) return
      assert(typeof base === 'string')
      assert(typeof ssr === 'boolean')
      const manifest = {
        version: projectInfo.projectVersion,
        usesClientRouter: includesClientSideRouter(bundle as any),
        base,
      }
      this.emitFile({
        fileName: `vite-plugin-ssr.json`,
        type: 'asset',
        source: JSON.stringify(manifest, null, 2),
      })
    },
  } as Plugin
}

function includesClientSideRouter(bundle: Record<string, { modules?: Record<string, unknown> }>) {
  // Current directory: vite-plugin-ssr/dist/cjs/node/plugin/
  const filePath = require.resolve('../../../../dist/esm/client/router/useClientRouter.js')
  for (const file of Object.keys(bundle)) {
    const bundleFile = bundle[file]
    assert(bundleFile)
    const modules = bundleFile.modules || {}
    if (filePath in modules || normalizePath(filePath) in modules) {
      return true
    }
  }
  return false
}
