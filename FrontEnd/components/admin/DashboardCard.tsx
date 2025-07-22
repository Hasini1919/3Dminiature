import React from "react";
import Link from "next/link";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  dotColor: string; // Tailwind bg color class like "bg-green-500"
  link?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  dotColor,
  link,
}) => {
  const cardContent = (
    <div className="block p-6 rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center space-x-4">
        <div
          className={`p-3 rounded-lg flex items-center justify-center text-white ${dotColor} transition-transform duration-300 group-hover:scale-110`}
          style={{ width: 48, height: 48 }}
        >
          <div className="text-3xl">{icon}</div>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-700">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
      </div>
    </div>
  );

  return link ? <Link href={link}>{cardContent}</Link> : cardContent;
};

export default DashboardCard;
