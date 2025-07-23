import { Order } from "@/types/admin/order";

interface Props {
  data?: Order[];
  onStatusChange: (orderId: string, newStatus: string) => void;
  headerColor?: string;
  rowHoverColor?: string;
  selectBgColor?: string;
}

export default function OrderTable({
  data = [],
  onStatusChange,
  headerColor = "bg-gray-800",
  rowHoverColor = "hover:bg-gray-100",
  selectBgColor = "bg-gray-300"
}: Props) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="w-full text-sm text-center">
        <thead className={`${headerColor} text-white uppercase text-sm`}>
          <tr>
            <th className="p-3">Order ID</th>
            <th className="p-3">User ID</th>
            <th className="p-3">Order No</th>
            <th className="p-3">Items</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Shipping</th>
            <th className="p-3">Address</th>
            <th className="p-3">Payment Method</th>
            <th className="p-3">Paid</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item._id} className={`border-b ${rowHoverColor} transition-colors`}>
                <td className="p-3">{item._id}</td>
                <td className="p-3">{item.userId}</td>
                <td className="p-3">{item.orderNumber}</td>
                <td className="p-3">
                  {Object.entries(item.items || {}).map(([key, value]: [string, any]) => (
                    <div key={key}>
                      <strong>{key}</strong>: {JSON.stringify(value)}
                    </div>
                  ))}
                </td>
                <td className="p-3">Rs. {item.amount}</td>
                <td className="p-3">{item.selectedShippingOption}</td>
                <td className="p-3">
                  {item.address?.street}, {item.address?.city}, {item.address?.postalCode}
                </td>
                <td className="p-3">{item.paymentMethod}</td>
                <td className="p-3">{item.payment ? "Yes" : "No"}</td>
                <td className="p-3">
                  <select
                    value={item.status}
                    onChange={(e) => onStatusChange(item._id, e.target.value)}
                    className={`${selectBgColor} text-black text-sm px-2 py-1 rounded-md`}
                  >
                    <option value="Order Placed">New</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-center p-6 text-gray-500">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
