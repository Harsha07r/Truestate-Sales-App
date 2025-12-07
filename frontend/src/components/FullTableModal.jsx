export default function FullTableModal({ open, onClose, data }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start p-10 z-50">
      
      <div className="bg-white w-full h-[90vh] overflow-auto rounded-lg shadow-xl relative">

        <div className="sticky top-0 bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
          <h2 className="text-xl font-semibold">Full Table View</h2>
          <button
            onClick={onClose}
            className="text-white text-xl hover:text-red-400"
          >
            ✕
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 border">Transaction ID</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Customer ID</th>
              <th className="p-3 border">Customer name</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Gender</th>
              <th className="p-3 border">Age</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Qty</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Region</th>
              <th className="p-3 border">Product ID</th>
              <th className="p-3 border">Employee</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <td className="p-2 border">{item.transactionId}</td>
                <td className="p-2 border">{item.date}</td>
                <td className="p-2 border">{item.customerId}</td>
                <td className="p-2 border">{item.customerName}</td>
                <td className="p-2 border">{item.phoneNumber}</td>
                <td className="p-2 border">{item.gender}</td>
                <td className="p-2 border">{item.age}</td>
                <td className="p-2 border">{item.productCategory}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">₹{item.totalAmount}</td>
                <td className="p-2 border">{item.customerRegion}</td>
                <td className="p-2 border">{item.productId}</td>
                <td className="p-2 border">{item.employeeName}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
