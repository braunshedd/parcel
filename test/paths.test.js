import test from 'node:test';
import assert from 'node:assert/strict';

import { resolveAsset, isServableAsset } from '../src/paths.js';

test('resolves an asset beneath the root', () => {
  assert.equal(resolveAsset('/srv/labels', 'UPS12345678.pdf'), '/srv/labels/UPS12345678.pdf');
});

test('resolves a nested asset', () => {
  assert.equal(resolveAsset('/srv/labels', '2026/01/UPS12345678.pdf'), '/srv/labels/2026/01/UPS12345678.pdf');
});

test('serves only labels and manifests', () => {
  assert.equal(isServableAsset('/srv/labels/UPS12345678.pdf'), true);
  assert.equal(isServableAsset('/srv/labels/manifest.json'), true);
  assert.equal(isServableAsset('/srv/labels/notes.txt'), false);
});
