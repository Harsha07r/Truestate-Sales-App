import axios from "axios";

const API_URL = "http://localhost:3000/sales";   

export async function getSales(params) {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (err) {
    console.error("API Error:", err);
    return { data: [], totalPages: 1, page: 1 };
  }
}
