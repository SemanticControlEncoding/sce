# Release checklist

## 1. Prep

- [ ] Update `CHANGELOG.md` with a new section (e.g. `## v0.2.0 - 2025-01-10`)
- [ ] Bump version in `package.json`
- [ ] If ontology changes: update `spec/sce-standard-v1.md` and docs
- [ ] Run formatter / linter locally

```bash
npm run lint
npm test
mkdocs build
```

## 2. CI / sanity

- [ ] Ensure GitHub Actions CI is green (tests + coverage)
- [ ] Ensure Docs workflow is green (docs build + deploy)

## 3. Publish package

```bash
pnpm run build
pnpm publish --access public
```

- [ ] Confirm new version appears on npm
- [ ] Update README badges or install instructions if version-specific

## 4. Tag & GitHub Release

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

- [ ] Create a GitHub Release for vX.Y.Z
- [ ] Paste changelog section into the release notes

## 5. Post-release

- [ ] Verify [docs](https://semanticcontrolengine.github.io/sce)
- [ ] Verify MCP server works with the new version (ideally before release...)
