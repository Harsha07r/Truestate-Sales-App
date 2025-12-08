const loadCSVStream = require("../utils/loadCSV");
const { search, applyFilters, applySorting, paginate } = require("../services/sales.service");

async function getSales(req, res) {
  try {
    // Load CSV fresh on every request (works with Render memory limits)
    let data = await loadCSVStream();

    // SEARCH
    const searchTerm = req.query.search || "";
    data = search(data, searchTerm);

    // FILTERS
    const filters = {
      region: req.query.region ? req.query.region.split(",") : [],
      gender: req.query.gender ? req.query.gender.split(",") : [],
      customerType: req.query.customerType ? req.query.customerType.split(",") : [],
      category: req.query.category ? req.query.category.split(",") : [],
      brand: req.query.brand ? req.query.brand.split(",") : [],
      tags: req.query.tags ? req.query.tags.split(",") : [],
    };

    data = applyFilters(data, filters);

    // SORTING
    const sort = req.query.sort || "";
    data = applySorting(data, sort);

    // PAGINATION
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // fixed page size (assignment requirement)

    const result = paginate(data, page, limit);

    res.json({
      totalRecords: data.length,
      totalPages: result.totalPages,
      page,
      limit,
      data: result.pageData,
    });
  } catch (err) {
    console.error("Error in getSales:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getSales };
