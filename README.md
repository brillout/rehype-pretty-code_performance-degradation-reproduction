Reproduction steps:

```bash
git clone git@github.com:brillout/rehype-pretty-code_performance-degradation-reproduction
cd rehype-pretty-code_performance-degradation-reproduction/
pnpm run setup
pnpm install
pnpm run build
cd docs/ && pnpm run preview
```

As single line:

```bash
git clone git@github.com:brillout/rehype-pretty-code_performance-degradation-reproduction && cd rehype-pretty-code_performance-degradation-reproduction/ && pnpm run setup && pnpm install && pnpm run build && cd docs/ && pnpm run preview
```

Node.js crashes with a heap out-of-memory error.

Changing `package.json#pnpm.overrides.rehype-pretty-code` from `0.2.5` to `0.2.4` fixes the issue.
