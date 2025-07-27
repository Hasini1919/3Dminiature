import OrderTable from "@/components/admin/test/newtable";
import Pdf from "@/components/pdf/pdf";

export default function OrdersPage() {
  return (
    <div className="p-4">
      {/* Container wrapping both PDF and OrderTable */}
      <div className="relative bg-white p-4 rounded shadow mt-16">
        {/* PDF button positioned at top-right inside the container */}
        <div className="absolute top-4 right-4">
          <Pdf />
        </div>

        {/* The table itself */}
        <OrderTable />
      </div>
    </div>
  );
}