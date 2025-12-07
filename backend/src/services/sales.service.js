
function search(data, term) {
  if (!term || term.trim() === "") return data;

  const lower = term.toLowerCase();

  return data.filter((item) => {
    const name = item.customerName ? String(item.customerName).toLowerCase() : "";
    const phone = item.phoneNumber ? String(item.phoneNumber).toLowerCase() : "";
    return name.includes(lower) || phone.includes(lower);
  });
}

function applyFilters(data, filters) {
  if (!filters) return data;

  return data.filter((item) => {
    if (filters.region && filters.region.length > 0) {
      if (!filters.region.includes(item.customerRegion)) return false;
    }

    if (filters.gender && filters.gender.length > 0) {
      if (!filters.gender.includes(item.gender)) return false;
    }

    if (filters.customerType && filters.customerType.length > 0) {
      if (!filters.customerType.includes(item.customerType)) return false;
    }

  
    if (filters.category && filters.category.length > 0) {
      if (!filters.category.includes(item.productCategory)) return false;
    }

    if (filters.brand && filters.brand.length > 0) {
      if (!filters.brand.includes(item.brand)) return false;
    }

    if (filters.tags && filters.tags.length > 0) {
      const itemTags = Array.isArray(item.tags) ? item.tags : (item.tags ? String(item.tags).split(",") : []);
      const matched = filters.tags.some((t) => itemTags.includes(t));
      if (!matched) return false;
    }

    if (filters.paymentMethod && filters.paymentMethod.length > 0) {
      if (!filters.paymentMethod.includes(item.paymentMethod)) return false;
    }

    if (filters.orderStatus && filters.orderStatus.length > 0) {
      if (!filters.orderStatus.includes(item.orderStatus)) return false;
    }

    if (filters.deliveryType && filters.deliveryType.length > 0) {
      if (!filters.deliveryType.includes(item.deliveryType)) return false;
    }

    if (filters.minAmount !== null && filters.minAmount !== undefined) {
      if (Number(item.finalAmount) < Number(filters.minAmount)) return false;
    }
    if (filters.maxAmount !== null && filters.maxAmount !== undefined) {
      if (Number(item.finalAmount) > Number(filters.maxAmount)) return false;
    }

    if (filters.ageMin !== null && filters.ageMin !== undefined) {
      if (Number(item.age) < Number(filters.ageMin)) return false;
    }
    if (filters.ageMax !== null && filters.ageMax !== undefined) {
      if (Number(item.age) > Number(filters.ageMax)) return false;
    }

    if (filters.dateStart || filters.dateEnd) {
      const itemDate = item.date ? new Date(item.date) : null;
      if (!itemDate || isNaN(itemDate.getTime())) return false;
      if (filters.dateStart) {
        const start = new Date(filters.dateStart);
        if (itemDate < start) return false;
      }
      if (filters.dateEnd) {
        const end = new Date(filters.dateEnd);
        end.setHours(23, 59, 59, 999);
        if (itemDate > end) return false;
      }
    }

    return true; 
  });
}

module.exports = {
  search,
  applyFilters,
};
