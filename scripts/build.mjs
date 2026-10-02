import { mkdir, copyFile, rm, readdir, lstat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const check = spawnSync(process.execPath, [resolve(root, 'scripts/check.mjs')], { stdio: 'inherit' });
if (check.status !== 0) process.exit(check.status || 1);
const destination = resolve(root, '_site');
// A fixed destination and explicit allowlist keep unrelated files out of Pages.
// Keep the directory itself so a Windows preview server can hold it as its cwd.
await mkdir(destination, { recursive: true });
if ((await lstat(destination)).isSymbolicLink()) throw new Error('Build destination must not be a symlink.');
for (const entry of await readdir(destination)) {
  const stale = resolve(destination, entry);
  if (dirname(stale) !== destination) throw new Error('Build cleanup must stay inside _site.');
  await rm(stale, { recursive: true, force: true });
}
await mkdir(resolve(destination, 'assets'), { recursive: true });
await copyFile(resolve(root, 'index.html'), resolve(destination, 'index.html'));
async function copyAssets(source, target) {
  for (const entry of await readdir(source, { withFileTypes: true })) {
    const path = resolve(source, entry.name);
    if ((await lstat(path)).isSymbolicLink()) throw new Error('Asset symlinks are not supported.');
    if (entry.name.startsWith('.')) throw new Error('Hidden files are not allowed in public assets.');
    if (entry.isDirectory()) {
      await mkdir(resolve(target, entry.name), { recursive: true });
      await copyAssets(path, resolve(target, entry.name));
    } else {
      if (!/\.(?:js|css|svg|png|jpe?g|webp|avif|gif|ico|woff2?|pdf)$/i.test(entry.name)) throw new Error(`Unsupported public asset: ${entry.name}`);
      await copyFile(path, resolve(target, entry.name));
    }
  }
}
await copyAssets(resolve(root, 'assets'), resolve(destination, 'assets'));
console.log('Built _site/ using index.html and public assets only.');
