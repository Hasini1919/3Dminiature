interface Props {
    status: string;
  }
  
  export default function StatusBadge({ status }: Props) {
    const color =
      status === "Completed"
        ? "bg-green-100 text-green-800"
        : status === "Pending"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-blue-100 text-blue-800";
  
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
        {status}
      </span>
    );
  }
  