import axios from "axios";

const API_BASE = "https://truestate-app.onrender.com";   // ✅ Backend LIVE URL

export async function getSales(params) {
  try {
    const response = await axios.get(`${API_BASE}/sales`, { params });
    return response.data;
  } catch (err) {
    console.error("API Error:", err);
    return {
      totalRecords: 0,
      totalPages: 1,
      page: 1,
      limit: 10,
      data: [],
    };
  }
}
