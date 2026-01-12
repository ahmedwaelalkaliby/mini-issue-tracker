import { memo } from "react";
import type { Priority } from "../types/types";

interface PriorityBadgeProps {
  priority: Priority;
}

const priorityColors: Record<Priority, string> = {
  High: "bg-red-100 text-red-800 border-red-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Low: "bg-green-100 text-green-800 border-green-200",
};

const PriorityBadge = memo(({ priority }: PriorityBadgeProps) => {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded border ${priorityColors[priority]}`}>
      {priority}
    </span>
  );
});

PriorityBadge.displayName = "PriorityBadge";

export default PriorityBadge;