import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSalesCsv, summarizeSales } from '../src/legacy/utils/salesAnalytics.mjs';
const header = 'order_id,date,category,revenue\n';
const sample = header + 'A,2026-11-01,Electronics,250.00\nB,2026-11-02,Clothing,120\nC,2026-12-03,Electronics,180.00';
test('calculates totals and groups', () => {
    const result = summarizeSales(parseSalesCsv(sample));
    assert.equal(result.revenueCents, 55000);
    assert.equal(result.orderCount, 3);
    assert.equal(result.averageOrderCents, 18333);
    assert.deepEqual(result.monthly, [{ month: '2026-11', revenueCents: 37000 }, { month: '2026-12', revenueCents: 18000 }]);
    assert.deepEqual(result.categories, [{ category: 'Clothing', revenueCents: 12000 }, { category: 'Electronics', revenueCents: 43000 }]);
});
test('combines filters and handles empty results', () => {
    const records = parseSalesCsv(sample);
    assert.equal(summarizeSales(records, { category: 'Electronics', endDate: '2026-11-30' }).revenueCents, 25000);
    assert.equal(summarizeSales(records, { startDate: '2027-01-01' }).averageOrderCents, 0);
});
test('supports BOM, CRLF, quoted commas and escaped quotes', () => {
    const rows = parseSalesCsv('\uFEFF' + header.replace('\n', '\r\n') + 'A,2026-11-01,"Home, ""Decor""",0.01\r\n');
    assert.equal(rows[0].category, 'Home, "Decor"');
    assert.equal(rows[0].revenueCents, 1);
});
for (const [name, input] of [
    ['wrong headers', 'a,b,c,d\n1,2,3,4'],
    ['empty input', header],
    ['invalid date', header + 'A,2026-02-30,Food,10'],
    ['negative amount', header + 'A,2026-11-01,Food,-10'],
    ['excess precision', header + 'A,2026-11-01,Food,1.001'],
    ['duplicate orders', sample + '\nA,2026-11-02,Food,10'],
    ['unclosed quote', header + 'A,2026-11-01,"Food,10'],
    ['missing fields', header + 'A,2026-11-01,Food'],
]) test(`rejects ${name}`, () => assert.throws(() => parseSalesCsv(input)));
