
const express = require("express");
const cors = require("cors");
const loadCSV = require("./utils/loadCSV");
const salesRoutes = require("./routes/sales.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/sales", salesRoutes);

app.get("/", (req, res) => res.send("TruEstate Backend Running"));

const PORT = process.env.PORT || 3000;

loadCSV()
  .then((data) => {
    global.salesData = data;
    console.log("Dataset ready");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to load CSV, exiting.", err);
    process.exit(1);
  });
