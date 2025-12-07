import { useState } from "react";

export default function useFilters() {
  const [filters, setFilters] = useState({
    search: "",
    region: "",
    gender: "",
    customerType: "",
    category: "",
    brand: "",
    paymentMethod: "",
    orderStatus: "",
    ageMin: "",
    ageMax: "",
    dateStart: "",
    dateEnd: "",
    tags: [],
    sort: "",
  });

  function updateFilter(key, value) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function clearFilters() {
    setFilters({
      search: "",
      region: "",
      gender: "",
      customerType: "",
      category: "",
      brand: "",
      paymentMethod: "",
      orderStatus: "",
      ageMin: "",
      ageMax: "",
      dateStart: "",
      dateEnd: "",
      tags: [],
      sort: "",
    });
  }

  return { filters, updateFilter, clearFilters };
}
