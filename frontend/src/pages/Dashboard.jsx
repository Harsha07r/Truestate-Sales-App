import { useEffect, useState } from "react";
import { getSales } from "../services/api";
import useFilters from "../hooks/useFilters";
import FullTableModal from "../components/FullTableModal";

export default function Dashboard() {
  const { filters, updateFilter, clearFilters } = useFilters();

  const [salesData, setSalesData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);

  // LOAD DATA WHEN FILTERS OR PAGE CHANGE
  useEffect(() => {
    loadSales();
  }, [filters, page]);

  async function loadSales() {
    const res = await getSales({ ...filters, page });

    setSalesData(res.data || []);
    setTotalPages(res.totalPages || 1);
    setTotalRecords(res.totalRecords || 0);
  }

  function handleClearFilters() {
    clearFilters();
    setPage(1);
  }

  return (
    <div className="p-6">

      {/* Title */}
      <h1 className="text-3xl font-semibold text-center mb-8">Sales Management System</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow border text-center">
          <p className="text-gray-500 text-sm">Total Records</p>
          <p className="text-3xl font-semibold mt-2">{totalRecords}</p>
        </div>

        <div className="bg-white p-6 rounded shadow border text-center">
          <p className="text-gray-500 text-sm">Units (This Page)</p>
          <p className="text-3xl font-semibold mt-2">
            {salesData.reduce((sum, row) => sum + row.quantity, 0)}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow border text-center">
          <p className="text-gray-500 text-sm">Revenue (This Page)</p>
          <p className="text-3xl font-semibold mt-2">
            ₹{salesData.reduce((sum, row) => sum + row.totalAmount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* FILTERS PANEL */}
      <div className="bg-white p-6 rounded shadow border mb-6">
        <div className="grid grid-cols-4 gap-4">

          {/* Search */}
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Search name or phone"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
          />

          {/* Region */}
          <select className="border p-2 rounded" onChange={(e) => updateFilter("region", e.target.value)}>
            <option value="">All Regions</option>
            <option>East</option>
            <option>West</option>
            <option>North</option>
            <option>South</option>
            <option>Central</option>
          </select>

          {/* Gender */}
          <select className="border p-2 rounded" onChange={(e) => updateFilter("gender", e.target.value)}>
            <option value="">All Genders</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          {/* Customer Type */}
          <select className="border p-2 rounded" onChange={(e) => updateFilter("customerType", e.target.value)}>
            <option value="">All Customer Types</option>
            <option>New</option>
            <option>Returning</option>
            <option>Loyal</option>
          </select>

          {/* Category */}
          <select className="border p-2 rounded" onChange={(e) => updateFilter("category", e.target.value)}>
            <option value="">All Categories</option>
            <option>Electronics</option>
            <option>Beauty</option>
            <option>Clothing</option>
          </select>

          <select className="border p-2 rounded" onChange={(e) => updateFilter("brand", e.target.value)}>
            <option value="">All Brands</option>
            <option>SilkSkin</option>
            <option>UrbanWear</option>
            <option>TechPulse</option>
            <option>PureBloom</option>
          </select>

          <select className="border p-2 rounded" onChange={(e) => updateFilter("paymentMethod", e.target.value)}>
            <option value="">All Payments</option>
            <option>UPI</option>
            <option>Cash</option>
            <option>Debit Card</option>
            <option>Credit Card</option>
          </select>

          <select className="border p-2 rounded" onChange={(e) => updateFilter("orderStatus", e.target.value)}>
            <option value="">All Status</option>
            <option>Completed</option>
            <option>Cancelled</option>
            <option>Returned</option>
          </select>

          <input
            type="number"
            placeholder="Min Age"
            className="border p-2 rounded"
            onChange={(e) => updateFilter("ageMin", e.target.value)}
          />

          <input
            type="number"
            placeholder="Max Age"
            className="border p-2 rounded"
            onChange={(e) => updateFilter("ageMax", e.target.value)}
          />

          <input
            type="date"
            className="border p-2 rounded"
            onChange={(e) => updateFilter("dateStart", e.target.value)}
          />

          <input
            type="date"
            className="border p-2 rounded"
            onChange={(e) => updateFilter("dateEnd", e.target.value)}
          />

          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="border p-2 rounded"
            onChange={(e) => updateFilter("tags", e.target.value.split(",").map(t => t.trim()))}
          />

          <select className="border p-2 rounded" onChange={(e) => updateFilter("sort", e.target.value)}>
            <option value="">Sort</option>
            <option value="date">Date (Newest First)</option>
            <option value="quantity">Quantity High → Low</option>
            <option value="name">Customer Name A → Z</option>
          </select>
        </div>

        <button
          onClick={handleClearFilters}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Filters
        </button>
      </div>

      <div className="flex justify-end mb-2">
        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Full Table View
        </button>
      </div>

      <div className="bg-white rounded shadow border overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Product</th>
              <th className="p-3 border">Qty</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Payment</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {salesData.map((item, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="p-3 border">{item.date}</td>
                <td className="p-3 border">{item.customerName}</td>
                <td className="p-3 border">{item.phoneNumber}</td>
                <td className="p-3 border">{item.productCategory}</td>
                <td className="p-3 border">{item.productName}</td>
                <td className="p-3 border">{item.quantity}</td>
                <td className="p-3 border">₹{item.totalAmount}</td>
                <td className="p-3 border">{item.paymentMethod}</td>
                <td className="p-3 border">{item.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 border rounded ${page === 1 ? "opacity-50" : ""}`}
        >
          Prev
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 border rounded ${page === totalPages ? "opacity-50" : ""}`}
        >
          Next
        </button>
      </div>

      <FullTableModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        data={salesData}
      />
    </div>
  );
}
