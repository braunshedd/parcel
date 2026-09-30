# parcel

A parcel tracking library. No dependencies, no network, no build step — Node 22
and the test runner it ships with.

```sh
node --test
```

## API

```js
import {
  resolveAsset,
  isServableAsset,
  parseTrackingNumber,
  carrierOf,
  formatLabel,
  RATES,
  cheapestRate,
  findDuplicates,
} from './src/index.js';
```

- `resolveAsset(root, requestPath)` — the on-disk path of a label or manifest a
  client asked for, beneath `root`.
- `isServableAsset(resolved)` — whether a resolved path is one the server will
  serve. Labels are PDFs and manifests are JSON.
- `parseTrackingNumber(input)` — `{ carrier, serial }`, or `null`. A tracking
  number is one or more carrier letter groups followed by eight digits.
- `carrierOf(input)` — the carrier alone, or `'unknown'`.
- `formatLabel(shipment)` — the one-line label text for a shipment.
- `RATES` — the rate card. `maxKg` is inclusive.
- `cheapestRate(weightKg)` — the cheapest band that carries the weight, across
  every carrier, or `null`.
- `findDuplicates(shipments)` — the tracking numbers appearing more than once,
  each reported once.

## Layout

```
src/paths.js      asset path resolution
src/tracking.js   tracking number parsing
src/rates.js      the rate card, and duplicate detection over a shipment list
src/index.js      the public surface
test/             one file per module
```
