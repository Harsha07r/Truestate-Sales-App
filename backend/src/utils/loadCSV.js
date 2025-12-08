const axios = require("axios");
const csv = require("csv-parser");

// Stream CSV on-demand (works with Render free tier)
async function loadCSVStream() {
  const fileUrl = process.env.CSV_URL;

  if (!fileUrl) {
    throw new Error("Missing CSV_URL in environment variables");
  }

  const rows = [];

  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: fileUrl,
      responseType: "stream",
    })
      .then(response => {
        response.data
          .pipe(csv())
          .on("data", (row) => {
            rows.push({
              transactionId: row["Transaction ID"],
              date: row["Date"],
              customerId: row["Customer ID"],
              customerName: row["Customer Name"],
              phoneNumber: row["Phone Number"],
              gender: row["Gender"],
              age: Number(row["Age"]),
              customerRegion: row["Customer Region"],
              customerType: row["Customer Type"],
              productId: row["Product ID"],
              productName: row["Product Name"],
              brand: row["Brand"],
              productCategory: row["Product Category"],
              tags: row["Tags"] ? row["Tags"].split(",") : [],
              quantity: Number(row["Quantity"]),
              pricePerUnit: Number(row["Price per Unit"]),
              discountPercentage: Number(row["Discount Percentage"]),
              totalAmount: Number(row["Total Amount"]),
              finalAmount: Number(row["Final Amount"]),
              paymentMethod: row["Payment Method"],
              orderStatus: row["Order Status"],
              deliveryType: row["Delivery Type"],
              storeId: row["Store ID"],
              storeLocation: row["Store Location"],
              salespersonId: row["Salesperson ID"],
              employeeName: row["Employee Name"],
            });
          })
          .on("end", () => resolve(rows))
          .on("error", (err) => reject(err));
      })
      .catch(err => reject(err));
  });
}

module.exports = loadCSVStream;
