import test from 'node:test';
import assert from 'node:assert/strict';

import { parseTrackingNumber, carrierOf } from '../src/tracking.js';

test('parses a single-group tracking number', () => {
  assert.deepEqual(parseTrackingNumber('UPS12345678'), { carrier: 'UPS', serial: '12345678' });
});

test('parses a multi-group tracking number', () => {
  assert.deepEqual(parseTrackingNumber('DHL EXPRESS 90000001'), {
    carrier: 'DHL EXPRESS',
    serial: '90000001',
  });
});

test('rejects a number with the wrong serial length', () => {
  assert.equal(parseTrackingNumber('UPS 1234'), null);
});

test('reports the carrier of a tracking number', () => {
  assert.equal(carrierOf('DHL EXPRESS 90000001'), 'DHL');
  assert.equal(carrierOf('not a tracking number'), 'unknown');
});
