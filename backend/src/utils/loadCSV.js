const axios = require("axios");
const csv = require("csv-parser");
const { Readable } = require("stream");

async function loadCSV() {
  try {
    const fileUrl = process.env.CSV_URL;
    console.log("Downloading CSV from:", fileUrl);

    const response = await axios.get(fileUrl, {
      responseType: "arraybuffer",
    });

    const stream = Readable.from(response.data);
    const results = [];

    return new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on("data", (row) => results.push(row))
        .on("end", () => {
          console.log("CSV Loaded:", results.length, "rows");
          resolve(results);
        })
        .on("error", reject);
    });
  } catch (err) {
    console.error("CSV load error:", err);
    throw err;
  }
}

module.exports = loadCSV;
