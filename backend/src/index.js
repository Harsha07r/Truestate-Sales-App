const express = require("express");
const cors = require("cors");
const salesRoutes = require("./routes/sales.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/sales", salesRoutes);
app.get("/", (req, res) => res.send("Backend Running with CSV Streaming"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
