const axios = require("axios");
const csv = require("csv-parser");

const CSV_URL =
  "https://drive.google.com/uc?export=download&id=1BAWH3P2SF55QSB0p90zZoW0AESdP3pf0";

const AXIOS_TIMEOUT = 300000; // 5 min timeout

async function loadCSV() {
  console.log("Downloading CSV from:", CSV_URL);

  try {
    const response = await axios({
      url: CSV_URL,
      method: "GET",
      responseType: "stream",
      timeout: AXIOS_TIMEOUT,
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/csv",
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    return new Promise((resolve, reject) => {
      const results = [];
      let rowCount = 0;

      response.data
        .pipe(csv())
        .on("data", (row) => {
          results.push({
            date: row.Date || null,
            customer: row.Customer_Name || null,
            phone: row.Phone || null,
            category: row.Category || null,
            product: row.Product || null,
            quantity: Number(row.Quantity) || 0,
            amount: Number(row.Amount) || 0,
            payment: row.Payment_Mode || null,
            status: row.Status || null,
            age: Number(row.Age) || null,
            tags: row.Tags ? row.Tags.split(",") : [],
          });

          rowCount++;
          if (rowCount % 50000 === 0) {
            console.log(`Parsed ${rowCount} rows...`);
          }
        })
        .on("end", () => {
          console.log(`CSV Loaded Successfully: ${rowCount} rows`);
          resolve(results);
        })
        .on("error", (err) => {
          console.error("CSV Parse Error:", err);
          reject(err);
        });
    });
  } catch (error) {
    console.error("CSV Download Error:", error.message);
    throw new Error("Failed to download or parse CSV");
  }
}

module.exports = loadCSV;
