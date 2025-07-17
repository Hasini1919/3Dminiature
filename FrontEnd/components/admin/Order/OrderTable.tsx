import { Order } from "@/types/admin/order";

interface Props {
  data?: Order[];  // Optional now
  onStatusChange: (orderId: string, newStatus: string) => void;
  headerColor?: string;
  rowHoverColor?: string;
  selectBgColor?: string;
}

export default function OrderTable({
  data = [],  // default to empty array
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
            <th className="p-3">PID</th>
            <th className="p-3">Name</th>
            <th className="p-3">CID</th>
            <th className="p-3">Category</th>
            <th className="p-3">Frame Color</th>
            <th className="p-3">Theme</th>
            <th className="p-3">Size</th>
            <th className="p-3">Customization</th>
            <th className="p-3">Price</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className={`border-b ${rowHoverColor} transition-colors`}>
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.cid}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.frameColor}</td>
                <td className="p-3">{item.theme}</td>
                <td className="p-3">{item.size}</td>
                <td className="p-3">{item.customization || '-'}</td>
                <td className="p-3">{item.price}</td>
                <td className="p-3">
                  <select
                    value={item.status}
                    onChange={(e) => onStatusChange(item.id, e.target.value)}
                    className={`${selectBgColor} text-black text-sm px-2 py-1 rounded-md`}
                  >
                    <option value="new">New</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
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
