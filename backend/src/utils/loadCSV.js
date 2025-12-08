const axios = require("axios");
const unzipper = require("unzipper");
const csv = require("csv-parser");

async function loadCSV() {
  try {
    const csvURL = process.env.CSV_URL;
    console.log("Downloading ZIP from:", csvURL);

    // Download ZIP file as stream
    const zipStream = await axios({
      method: "GET",
      url: csvURL,
      responseType: "stream",
    });

    console.log("ZIP downloaded, extracting...");

    return new Promise((resolve, reject) => {
      const results = [];

      zipStream.data
        .pipe(unzipper.Parse())
        .on("entry", (entry) => {
          if (entry.path.endsWith(".csv")) {
            console.log("Extracting CSV:", entry.path);

            entry
              .pipe(csv())
              .on("data", (row) => results.push(row))
              .on("end", () => {
                console.log("CSV Loaded:", results.length, "records");
                resolve(results);
              });
          } else {
            entry.autodrain();
          }
        })
        .on("error", reject);
    });
  } catch (err) {
    console.error("Failed to load ZIP CSV:", err);
    throw err;
  }
}

module.exports = loadCSV;
