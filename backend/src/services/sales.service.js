function search(data, term) {
  if (!term.trim()) return data;

  const lower = term.toLowerCase();

  return data.filter(item =>
    item.customerName.toLowerCase().includes(lower) ||
    item.phoneNumber.toLowerCase().includes(lower)
  );
}

function applyFilters(data, filters) {
  return data.filter(item => {
    if (filters.region.length && !filters.region.includes(item.customerRegion)) return false;
    if (filters.gender.length && !filters.gender.includes(item.gender)) return false;
    if (filters.customerType.length && !filters.customerType.includes(item.customerType)) return false;
    if (filters.category.length && !filters.category.includes(item.productCategory)) return false;
    if (filters.brand.length && !filters.brand.includes(item.brand)) return false;

    if (filters.tags.length) {
      const hasMatch = item.tags.some(tag => filters.tags.includes(tag));
      if (!hasMatch) return false;
    }

    return true;
  });
}

function applySorting(data, sort) {
  if (!sort) return data;

  return data.sort((a, b) => {
    switch (sort) {
      case "name-asc":
        return a.customerName.localeCompare(b.customerName);
      case "name-desc":
        return b.customerName.localeCompare(a.customerName);

      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "date-desc":
        return new Date(b.date) - new Date(a.date);

      case "qty-asc":
        return a.quantity - b.quantity;
      case "qty-desc":
        return b.quantity - a.quantity;

      default:
        return 0;
    }
  });
}

function paginate(data, page, limit) {
  const totalPages = Math.ceil(data.length / limit);
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    totalPages,
    pageData: data.slice(start, end),
  };
}

module.exports = {
  search,
  applyFilters,
  applySorting,
  paginate,
};
