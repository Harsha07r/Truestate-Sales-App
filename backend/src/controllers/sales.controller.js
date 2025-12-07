
const { search, applyFilters } = require("../services/sales.service");

function getSales(req, res) {
  try {
    let data = global.salesData || [];

    const searchTerm = req.query.search || "";
    data = search(data, searchTerm);

    const filters = {
      region: req.query.region ? String(req.query.region).split(",").filter(Boolean) : [],
      gender: req.query.gender ? String(req.query.gender).split(",").filter(Boolean) : [],
      customerType: req.query.customerType ? String(req.query.customerType).split(",").filter(Boolean) : [],

      category: req.query.category ? String(req.query.category).split(",").filter(Boolean) : [],
      brand: req.query.brand ? String(req.query.brand).split(",").filter(Boolean) : [],
      tags: req.query.tags ? String(req.query.tags).split(",").map(s => s.trim()).filter(Boolean) : [],

      paymentMethod: req.query.paymentMethod ? String(req.query.paymentMethod).split(",").filter(Boolean) : [],
      orderStatus: req.query.orderStatus ? String(req.query.orderStatus).split(",").filter(Boolean) : [],
      deliveryType: req.query.deliveryType ? String(req.query.deliveryType).split(",").filter(Boolean) : [],

      ageMin: req.query.ageMin ? Number(req.query.ageMin) : null,
      ageMax: req.query.ageMax ? Number(req.query.ageMax) : null,

      minAmount: req.query.minAmount ? Number(req.query.minAmount) : null,
      maxAmount: req.query.maxAmount ? Number(req.query.maxAmount) : null,

      dateStart: req.query.dateStart || null,
      dateEnd: req.query.dateEnd || null,
    };

    data = applyFilters(data, filters);

    const sort = req.query.sort || "";
    if (sort === "date") {
      data.sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first
    } else if (sort === "quantity") {
      data.sort((a, b) => Number(b.quantity) - Number(a.quantity));
    } else if (sort === "name") {
      data.sort((a, b) => String(a.customerName).localeCompare(String(b.customerName)));
    }

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedData = data.slice(start, end);

    res.json({
      totalRecords: data.length,
      totalPages: Math.max(1, Math.ceil(data.length / limit)),
      page,
      limit,
      data: paginatedData,
    });
  } catch (err) {
    console.error("getSales error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getSales };
