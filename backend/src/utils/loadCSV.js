const axios = require("axios");
const csv = require("csv-parser");

const CSV_URL = "https://drive.google.com/uc?export=download&id=1BAWH3P2SF55QSB0p90zZoW0AESdP3pf0";

// 5-minute timeout (Render is slow)
const AXIOS_TIMEOUT = 300000;

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
        "Accept": "text/csv",
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    return new Promise((resolve, reject) => {
      const results = [];
      let rowCount = 0;

      response.data
        .pipe(csv())
        .on("data", (data) => {
          results.push(data);
          rowCount++;

          if (rowCount % 50000 === 0) {
            console.log(`Parsed: ${rowCount} rows...`);
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
