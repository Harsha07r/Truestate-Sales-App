function mapRow(row) {
  return {
    date: row["Transaction Date"] || null,
    customer: row["Customer Name"] || null,
    phone: row["Phone Number"] || null,
    category: row["Category"] || null,
    product: row["Product Name"] || null,
    qty: Number(row["Quantity"]) || 0,
    amount: Number(row["Final Amount"]) || 0,
    payment: row["Payment Method"] || null,
    status: row["Order Status"] || null,
    region: row["Region"] || null,
    gender: row["Gender"] || null,
  };
}

function paginate(data, page, limit) {
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    totalRecords: data.length,
    totalPages: Math.ceil(data.length / limit),
    page,
    limit,
    data: data.slice(start, end).map(mapRow),
  };
}

module.exports = { paginate };
