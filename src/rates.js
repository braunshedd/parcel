/**
 * The shipping rate card, cheapest first within a carrier. `maxKg` is
 * inclusive; a shipment heavier than every band has no rate.
 */
export const RATES = [
  { carrier: 'UPS', maxKg: 1, cents: 799 },
  { carrier: 'UPS', maxKg: 5, cents: 1499 },
  { carrier: 'UPS', maxKg: 20, cents: 3299 },
  { carrier: 'DHL', maxKg: 1, cents: 899 },
  { carrier: 'DHL', maxKg: 5, cents: 1399 },
  { carrier: 'DHL', maxKg: 20, cents: 2999 },
];

/**
 * The cheapest rate that carries `weightKg`, across every carrier.
 *
 * Returns `null` when the shipment is heavier than every band on the card.
 */
export function cheapestRate(weightKg) {
  const eligible = RATES.filter((rate) => weightKg <= rate.maxKg);
  if (eligible.length === 0) {
    return null;
  }
  return eligible.sort((a, b) => a.cents - b.cents)[0];
}

/**
 * The tracking numbers appearing more than once in `shipments`, each reported
 * once, in the order of their first duplicate.
 */
export function findDuplicates(shipments) {
  const duplicates = [];
  for (let i = 0; i < shipments.length; i += 1) {
    for (let j = i + 1; j < shipments.length; j += 1) {
      if (shipments[i].tracking === shipments[j].tracking) {
        if (!duplicates.includes(shipments[i].tracking)) {
          duplicates.push(shipments[i].tracking);
        }
      }
    }
  }
  return duplicates;
}
