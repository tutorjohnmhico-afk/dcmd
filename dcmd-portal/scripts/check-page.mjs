import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { build } from 'vite';

const folder = await mkdtemp(resolve('.tmp-team-page-'));
try {
  await build({ logLevel: 'silent', build: { ssr: 'src/App.jsx', outDir: folder, emptyOutDir: true } });
  const { default: App } = await import(pathToFileURL(join(folder, 'App.js')).href);
  const html = renderToStaticMarkup(createElement(App));
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'Page IDs must be unique');
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.includes(id), `Navigation target #${id} is missing`);
  }
  for (const id of ['about', 'services', 'systems', 'vision', 'contact']) assert.ok(ids.includes(id));
  assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1, 'The page needs exactly one primary heading');
  assert.equal([...html.matchAll(/class="service-card"/g)].length, 4);
  assert.equal([...html.matchAll(/class="system-item"/g)].length, 8);
  assert.match(html, /aria-controls="primary-nav"/);
  assert.match(html, /href="mailto:dcmd@butuan.gov.ph"/);
  assert.match(html, /<textarea[^>]*required[^>]*>/);
  assert.match(html, /Skip to main content/);
  console.log('Page checks passed: section links, unique IDs, headings, cards, contact and navigation markup.');
} finally {
  await rm(folder, { recursive: true, force: true });
}
