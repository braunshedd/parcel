/**
 * A tracking number is one or more carrier letter groups followed by eight
 * digits: `UPS 12345678`, `DHL EXPRESS 90000001`.
 */
const TRACKING = /^([A-Z]+\s*)+\d{8}$/;

/**
 * Parse a tracking number into its carrier prefix and its serial.
 *
 * Returns `null` for anything that is not a tracking number; whitespace between
 * carrier groups is not significant.
 */
export function parseTrackingNumber(input) {
  const trimmed = input.trim();
  if (!TRACKING.test(trimmed)) {
    return null;
  }
  const serial = trimmed.slice(-8);
  const carrier = trimmed.slice(0, -8).trim().replace(/\s+/g, ' ');
  return { carrier, serial };
}

/**
 * The carrier a tracking number belongs to, or `'unknown'`.
 */
export function carrierOf(input) {
  const parsed = parseTrackingNumber(input);
  return parsed === null ? 'unknown' : parsed.carrier.split(' ')[0];
}
