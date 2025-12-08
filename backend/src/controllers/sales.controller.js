const axios = require('axios');
const csv = require('csv-parser');

function rowToObj(row) {
  return {
    transactionId: row['Transaction ID'],
    date: row['Date'],
    customerId: row['Customer ID'],
    customerName: row['Customer Name'],
    phoneNumber: row['Phone Number'],
    gender: row['Gender'],
    age: Number(row['Age']),
    customerRegion: row['Customer Region'],
    customerType: row['Customer Type'],
    productCategory: row['Product Category'],
    brand: row['Brand'],
    tags: row['Tags'] ? row['Tags'].split(',') : [],
    quantity: Number(row['Quantity'] || 0),
    // add fields you need...
  };
}

function matchesFilters(item, filters, searchLower) {
  if (filters.region.length && !filters.region.includes(item.customerRegion)) return false;
  if (filters.gender.length && !filters.gender.includes(item.gender)) return false;
  if (filters.customerType.length && !filters.customerType.includes(item.customerType)) return false;
  if (filters.category.length && !filters.category.includes(item.productCategory)) return false;
  if (filters.brand.length && !filters.brand.includes(item.brand)) return false;
  if (filters.tags.length) {
    const has = item.tags.some(t => filters.tags.includes(t));
    if (!has) return false;
  }
  if (searchLower) {
    if (!(
      (item.customerName || '').toLowerCase().includes(searchLower) ||
      (item.phoneNumber || '').toLowerCase().includes(searchLower)
    )) return false;
  }
  return true;
}

async function getSales(req, res) {
  try {
    const csvUrl = process.env.CSV_URL;
    if (!csvUrl) return res.status(500).json({ error: 'CSV_URL missing' });

    // parse query
    const search = (req.query.search || '').trim();
    const searchLower = search ? search.toLowerCase() : '';
    const filters = {
      region: req.query.region ? req.query.region.split(',') : [],
      gender: req.query.gender ? req.query.gender.split(',') : [],
      customerType: req.query.customerType ? req.query.customerType.split(',') : [],
      category: req.query.category ? req.query.category.split(',') : [],
      brand: req.query.brand ? req.query.brand.split(',') : [],
      tags: req.query.tags ? req.query.tags.split(',') : [],
    };
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let matchCount = 0;
    const pageRows = [];

    const response = await axios({ method: 'get', url: csvUrl, responseType: 'stream', timeout: 300000 });

    response.data
      .pipe(csv())
      .on('data', (row) => {
        try {
          const item = rowToObj(row);
          if (matchesFilters(item, filters, searchLower)) {
            // matched row
            if (matchCount >= skip && pageRows.length < limit) {
              pageRows.push(item);
            }
            matchCount++;
          }
        } catch (e) {
          // ignore malformed row
        }
      })
      .on('end', () => {
        const totalPages = Math.max(1, Math.ceil(matchCount / limit));
        res.json({
          totalRecords: matchCount,
          totalPages,
          page,
          limit,
          data: pageRows
        });
      })
      .on('error', (err) => {
        console.error('CSV stream error', err);
        res.status(500).json({ error: 'CSV stream error' });
      });
  } catch (err) {
    console.error('getSales error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getSales };
