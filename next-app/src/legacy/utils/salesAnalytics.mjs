/** Parse comma-separated fields, including quoted commas and escaped quotes. */
function csvRows(text) {
    const rows = [];
    let row = [], field = '', state = 'start';
    const cell = () => { row.push(field); field = ''; state = 'start'; };
    const line = () => { cell(); if (row.some(v => v.trim() !== '')) rows.push(row); row = []; };
    text = text.replace(/^\uFEFF/, '');
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (state === 'quoted') {
            if (c === '"') {
                if (text[i + 1] === '"') { field += '"'; i++; }
                else state = 'closed';
            } else field += c;
        } else if (c === ',') cell();
        else if (c === '\n' || c === '\r') {
            if (c === '\r' && text[i + 1] === '\n') i++;
            line();
        } else if (c === '"' && state === 'start') state = 'quoted';
        else if (c === '"' || state === 'closed') throw new Error('Invalid CSV quoting.');
        else { field += c; state = 'plain'; }
    }
    if (state === 'quoted') throw new Error('Unclosed quoted field.');
    line();
    return rows;
}

export function parseSalesCsv(text) {
    if (typeof text !== 'string' || text.length > 5_000_000) throw new Error('CSV is too large.');
    const [header, ...rows] = csvRows(text);
    const expected = ['order_id', 'date', 'category', 'revenue'];
    if (!header || header.length !== 4 || expected.some((key, i) => header[i].trim().toLowerCase() !== key)) {
        throw new Error('Expected header: order_id,date,category,revenue');
    }
    if (!rows.length || rows.length > 50_000) throw new Error('CSV must contain 1 to 50,000 orders.');
    const seen = new Set();
    return rows.map((row, i) => {
        const fail = message => { throw new Error(`Record ${i + 1}: ${message}`); };
        if (row.length !== 4) fail('Expected four fields.');
        const [orderId, date, category, amount] = row.map(v => v.trim());
        if (!orderId || !category || orderId.length > 100 || category.length > 100 || Array.from(orderId + category).some(c => c.charCodeAt(0) < 32 || c.charCodeAt(0) === 127)) fail('Invalid order ID or category.');
        if (seen.has(orderId)) fail('Duplicate order ID.');
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail('Use YYYY-MM-DD dates.');
        const time = new Date(`${date}T00:00:00Z`);
        if (!Number.isFinite(time.getTime()) || time.toISOString().slice(0, 10) !== date) fail('Invalid calendar date.');
        if (!/^\d{1,7}(\.\d{1,2})?$/.test(amount)) fail('Invalid non-negative revenue.');
        const [whole, fraction = ''] = amount.split('.');
        const revenueCents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
        seen.add(orderId);
        return { orderId, date, category, revenueCents };
    });
}

export function summarizeSales(records, { startDate = '', endDate = '', category = '' } = {}) {
    const filtered = records.filter(r => (!startDate || r.date >= startDate) && (!endDate || r.date <= endDate) && (!category || r.category === category));
    const monthly = new Map(), categories = new Map();
    let revenueCents = 0;
    for (const r of filtered) {
        revenueCents += r.revenueCents;
        const month = r.date.slice(0, 7);
        monthly.set(month, (monthly.get(month) ?? 0) + r.revenueCents);
        categories.set(r.category, (categories.get(r.category) ?? 0) + r.revenueCents);
    }
    return {
        orderCount: filtered.length,
        revenueCents,
        averageOrderCents: filtered.length ? Math.round(revenueCents / filtered.length) : 0,
        monthly: [...monthly].sort(([a], [b]) => a.localeCompare(b)).map(([month, revenueCents]) => ({ month, revenueCents })),
        categories: [...categories].sort(([a], [b]) => a.localeCompare(b)).map(([category, revenueCents]) => ({ category, revenueCents }))
    };
}
