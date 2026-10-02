import { readFile, readdir, lstat, access } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const assert = (condition, message) => { if (!condition) throw new Error(message); };
for (const file of ['assets/app.js', 'assets/config.js']) {
  const result = spawnSync(process.execPath, ['--check', resolve(root, file)], { encoding: 'utf8' });
  assert(result.status === 0, `JavaScript syntax failed: ${file}\n${result.stderr}`);
}
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert(ids.length === new Set(ids).size, 'Duplicate HTML IDs.');
for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
  const ref = match[1];
  if (ref.startsWith('#')) assert(ids.includes(ref.slice(1)), `Missing anchor target: ${ref}`);
  else {
    assert(ref.startsWith('./'), `The default page must use local assets: ${ref}`);
    await access(resolve(root, ref));
  }
}
const context = { window: {} };
runInNewContext(await readFile(resolve(root, 'assets/config.js'), 'utf8'), context, { timeout: 1000 });
const config = context.window.FORMA_CONFIG;
const isCopy = (value) => typeof value === 'string' || (value && typeof value === 'object' && (typeof value.en === 'string' || typeof value.zh === 'string'));
assert(config && config.profile, 'Missing profile configuration.');
assert(['en', 'zh'].includes(config.defaultLanguage), 'Unsupported default language.');
assert(['light', 'dark', 'system'].includes(config.defaultTheme), 'Unsupported default theme.');
for (const key of ['name', 'role', 'status', 'description', 'aboutLead', 'aboutDescription']) assert(isCopy(config.profile[key]), `Missing profile.${key}`);
assert(config.profile.headline?.length === 2 && config.profile.headline.every(isCopy), 'Headline needs two text lines.');
assert(isCopy(config.siteTitle) && isCopy(config.siteDescription), 'Missing page metadata.');
const projectIds = new Set();
for (const project of config.projects || []) {
  assert(project.id && !projectIds.has(project.id), 'Project IDs must be unique.');
  projectIds.add(project.id);
  assert(isCopy(project.title) && isCopy(project.description) && isCopy(project.summary), `Incomplete project: ${project.id}`);
  assert(['design', 'development', 'experiment'].includes(project.category), `Unsupported category: ${project.category}`);
  assert(['atlas', 'ground', 'hours', 'generic'].includes(project.art), `Unsupported illustration: ${project.art}`);
}
function checkUrl(value, allowRelative = false) {
  if (!value) return;
  assert(typeof value === 'string', 'URL must be a string.');
  assert(/^https?:\/\//i.test(value) || (allowRelative && /^\.\.?\//.test(value)), 'Use HTTP(S) URLs or a relative résumé path.');
  const url = new URL(value, 'https://example.invalid/');
  assert(['http:', 'https:'].includes(url.protocol) && !url.username && !url.password, 'Unsafe URL.');
}
for (const item of [...(config.projects || []), ...(config.notes || []), ...(config.profile.socials || [])]) checkUrl(item.url);
checkUrl(config.profile.resumeUrl, true);
assert(!config.profile.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.profile.email), 'Invalid contact email.');

// Check tracked-source candidates without printing any matched sensitive values.
const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\bgh[pousr]_[A-Za-z0-9]{20,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{20,}\b/,
  /\bAKIA[A-Z0-9]{16}\b/,
  /\bsk-[A-Za-z0-9_-]{24,}\b/,
  /[A-Z]:[\\/]Users[\\/][^\s"'<>]+/i,
];
let checked = 0;
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (['.git', '_site', 'node_modules'].includes(entry.name)) continue;
    const path = resolve(directory, entry.name);
    assert(!(await lstat(path)).isSymbolicLink(), 'Symlinks are not allowed in the template.');
    assert(!/^\.env(?:\.|$)/.test(entry.name), 'Environment files must stay outside the template.');
    if (entry.isDirectory()) await walk(path);
    else if (['.js', '.mjs', '.html', '.css', '.md', '.json', '.yml', '.yaml', '.svg', ''].includes(extname(entry.name))) {
      const content = await readFile(path, 'utf8');
      for (const pattern of secretPatterns) assert(!pattern.test(content), `Potential sensitive content in ${entry.name}; inspect locally.`);
      checked++;
    }
  }
}
await walk(root);
console.log(`PASS: JavaScript, configuration, local assets, anchors and ${checked} source files checked.`);
