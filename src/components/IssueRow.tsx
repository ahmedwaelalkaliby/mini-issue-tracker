import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Issue } from "../types/types";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

interface IssueRowProps {
  issue: Issue;
}

const IssueRow = memo(({ issue }: IssueRowProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/issue-details/${issue.id}`);
  }, [navigate, issue.id]);

  const formattedDate = new Date(issue.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="bg-white p-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 truncate">
            {issue.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{issue.body}</p>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={issue.status} />
            <PriorityBadge priority={issue.priority} />
            {issue.isLocal && (
              <span className="px-2 py-1 text-xs font-medium rounded border bg-emerald-100 text-emerald-800 border-emerald-200">
                Local
              </span>
            )}
            <span className="text-xs text-gray-500 ml-auto">{formattedDate}</span>
          </div>
        </div>
        <svg
          className="w-5 h-5 text-gray-400 shrink-0 mt-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
});

IssueRow.displayName = "IssueRow";

export default IssueRow;