import assert from 'node:assert/strict';
import test from 'node:test';
import { validBranch, validCommit } from './conventions.mjs';

test('branch conventions accept section work and hotfixes', () => {
  for (const name of ['feature/header-hero', 'fix/contact-email', 'hotfix/menu-focus', 'release/1.0.0', 'chore/team-collaboration']) assert.ok(validBranch(name));
  for (const name of ['master', 'main', 'My Branch', 'feature/', 'feature/Header', 'anything/name']) assert.ok(!validBranch(name));
});
test('commit conventions require type, separator and description', () => {
  for (const subject of ['feat(hero): update heading', 'fix: repair contact link', 'chore(release): prepare v1.0.0', 'feat!: change navigation']) assert.ok(validCommit(subject));
  for (const subject of ['update webpage', 'Test: Merge:', 'fix:no space', 'feat: ']) assert.ok(!validCommit(subject));
});
