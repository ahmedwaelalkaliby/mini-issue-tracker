import { memo } from "react";
import type { Status } from "../types/types";

interface StatusBadgeProps {
  status: Status;
}

const statusColors: Record<Status, string> = {
  Open: "bg-blue-100 text-blue-800 border-blue-200",
  "In Progress": "bg-purple-100 text-purple-800 border-purple-200",
  Closed: "bg-gray-100 text-gray-800 border-gray-200",
};

const StatusBadge = memo(({ status }: StatusBadgeProps) => {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded border ${statusColors[status]}`}>
      {status}
    </span>
  );
});

StatusBadge.displayName = "StatusBadge";

export default StatusBadge;