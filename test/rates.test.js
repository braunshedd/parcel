import test from 'node:test';
import assert from 'node:assert/strict';

import { cheapestRate, findDuplicates } from '../src/rates.js';

test('picks the cheapest band that carries the weight', () => {
  assert.deepEqual(cheapestRate(0.5), { carrier: 'UPS', maxKg: 1, cents: 799 });
  assert.deepEqual(cheapestRate(4), { carrier: 'DHL', maxKg: 5, cents: 1399 });
});

test('has no rate for a shipment heavier than every band', () => {
  assert.equal(cheapestRate(50), null);
});

test('reports each duplicated tracking number once', () => {
  const shipments = [
    { tracking: 'UPS12345678' },
    { tracking: 'DHL90000001' },
    { tracking: 'UPS12345678' },
    { tracking: 'DHL90000001' },
    { tracking: 'UPS12345678' },
  ];
  assert.deepEqual(findDuplicates(shipments), ['UPS12345678', 'DHL90000001']);
});

test('reports nothing when every tracking number is distinct', () => {
  const shipments = Array.from({ length: 200 }, (_, i) => ({
    tracking: `UPS${String(i).padStart(8, '0')}`,
  }));
  assert.deepEqual(findDuplicates(shipments), []);
});
