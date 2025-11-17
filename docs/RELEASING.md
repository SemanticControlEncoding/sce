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
- [ ] If one hasn't already been selected, pick a code-name for the next release. Codenames should be 2 words and are under no obligation to have anything to do with the capabilites that reslease will add. Some examples include:
  - Eternal Vigilance - grandiose surveillance energy
  - Infinite Wisdom - laughably overconfident
  - Resolute Compass - sounds decisive but probably lost
  - Crimson Phoenix - unnecessarily dramatic rebirth
  - Steadfast Glacier - oxymoronic slow-moving determination
  - Noble Serpent - trying too hard to sound cool
  - Valiant Echo - brave repetition of past mistakes
  - Solemn Falcon - taking itself way too seriously
