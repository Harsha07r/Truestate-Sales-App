const express = require("express");
const cors = require("cors");
const loadCSV = require("./utils/loadCSV");
const salesRoutes = require("./routes/sales.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/sales", salesRoutes);

app.get("/", (req, res) => {
  res.send("TruEstate Backend Running Successfully ");
});

const PORT = process.env.PORT || 3000;

console.log("Initializing server…");

// Load CSV from external URL (Google Drive)
loadCSV()
  .then((data) => {
    global.salesData = data;
    console.log(`✅ CSV Loaded: ${data.length} records`);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to load CSV. Server cannot start.", err);
    process.exit(1);
  });
