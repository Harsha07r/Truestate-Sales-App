
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

function loadCSV() {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, "../../data/sales.csv");
    const results = [];

    console.log("Loading CSV from:", filePath);

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        results.push({
          transactionId: row["Transaction ID"] || row.transactionId || null,
          date: row["Date"] || row.date || null,
          customerId: row["Customer ID"] || row.customerId || null,
          customerName: row["Customer Name"] || row.customerName || "",
          phoneNumber: row["Phone Number"] || row.phoneNumber || "",
          gender: row["Gender"] || row.gender || "",
          age: row["Age"] ? Number(row["Age"]) : (row.age ? Number(row.age) : null),
          customerRegion: row["Customer Region"] || row.customerRegion || "",
          customerType: row["Customer Type"] || row.customerType || "",
          productId: row["Product ID"] || row.productId || "",
          productName: row["Product Name"] || row.productName || "",
          brand: row["Brand"] || row.brand || "",
          productCategory: row["Product Category"] || row.productCategory || "",
          tags: row["Tags"] ? row["Tags"].split(",").map(s => s.trim()) : (row.tags ? (Array.isArray(row.tags) ? row.tags : String(row.tags).split(",").map(s=>s.trim())) : []),
          quantity: row["Quantity"] ? Number(row["Quantity"]) : (row.quantity ? Number(row.quantity) : 0),
          pricePerUnit: row["Price per Unit"] ? Number(row["Price per Unit"]) : (row.pricePerUnit ? Number(row.pricePerUnit) : 0),
          discountPercentage: row["Discount Percentage"] ? Number(row["Discount Percentage"]) : (row.discountPercentage ? Number(row.discountPercentage) : 0),
          totalAmount: row["Total Amount"] ? Number(row["Total Amount"]) : (row.totalAmount ? Number(row.totalAmount) : 0),
          finalAmount: row["Final Amount"] ? Number(row["Final Amount"]) : (row.finalAmount ? Number(row.finalAmount) : 0),
          paymentMethod: row["Payment Method"] || row.paymentMethod || "",
          orderStatus: row["Order Status"] || row.orderStatus || "",
          deliveryType: row["Delivery Type"] || row.deliveryType || "",
          storeId: row["Store ID"] || row.storeId || "",
          storeLocation: row["Store Location"] || row.storeLocation || "",
          salespersonId: row["Salesperson ID"] || row.salespersonId || "",
          employeeName: row["Employee Name"] || row.employeeName || "",
        });
      })
      .on("end", () => {
        console.log("CSV Loaded:", results.length, "records");
        resolve(results);
      })
      .on("error", (err) => {
        console.error("CSV load error:", err);
        reject(err);
      });
  });
}

module.exports = loadCSV;
