#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

function findPackages(dir) {
  const results = [];

  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(current, e.name);
      if (e.isDirectory()) {
        // If package.json exists here, treat as package root
        const pkg = path.join(full, "package.json");
        if (fs.existsSync(pkg)) {
          results.push(full);
          continue;
        }
        // otherwise recurse
        walk(full);
      }
    }
  }

  walk(dir);
  return results;
}

function copyIfExists(src, dest) {
  if (!fs.existsSync(src)) return false;
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  // Only copy if missing or different
  if (fs.existsSync(dest)) {
    const a = fs.readFileSync(src);
    const b = fs.readFileSync(dest);
    if (Buffer.compare(a, b) === 0) return false;
  }
  fs.copyFileSync(src, dest);
  return true;
}

function main() {
  const repoRoot = path.resolve(__dirname, "..");
  const packagesDir = path.join(repoRoot, "packages");

  const readme = path.join(repoRoot, "README.md");
  const license = path.join(repoRoot, "LICENSE");

  if (!fs.existsSync(packagesDir)) {
    console.error("No packages/ directory found at", packagesDir);
    process.exit(1);
  }

  const pkgs = findPackages(packagesDir);
  if (!pkgs.length) {
    console.log("No packages with package.json found under packages/");
    return;
  }

  console.log(`Found ${pkgs.length} package(s) to process.`);

  let copied = 0;
  for (const p of pkgs) {
    const destReadme = path.join(p, "README.md");
    const destLicense = path.join(p, "LICENSE");

    if (copyIfExists(readme, destReadme)) {
      console.log(`Copied README.md → ${path.relative(repoRoot, destReadme)}`);
      copied += 1;
    }
    if (copyIfExists(license, destLicense)) {
      console.log(`Copied LICENSE → ${path.relative(repoRoot, destLicense)}`);
      copied += 1;
    }
  }

  if (copied === 0) console.log("No files needed copying.");
  else console.log(`Copied ${copied} files.`);
}

main();
