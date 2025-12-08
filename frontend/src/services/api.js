const API_BASE = "https://truestate-app.onrender.com";

export async function getSales(params) {
  try {
    const response = await axios.get(`${API_BASE}/sales`, { params });
    return response.data;
  } catch (err) {
    console.error("API Error:", err);
    return { data: [], totalPages: 1 };
  }
}
