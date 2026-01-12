import { memo } from "react";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  totalIssues: number;
  localIssuesCount: number;
  onResetLocal: () => void;
}

const PageHeader = memo(({ totalIssues, localIssuesCount, onResetLocal }: PageHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Issues</h1>
        <p className="text-gray-600 mt-1">
          {totalIssues} {totalIssues === 1 ? "issue" : "issues"} total
          {localIssuesCount > 0 && (
            <span className="text-green-600 ml-2">({localIssuesCount} local)</span>
          )}
        </p>
      </div>
      <div className="flex gap-2">
        <Link
          to="/create-issue"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Issue
        </Link>
        {localIssuesCount > 0 && (
          <button
            onClick={onResetLocal}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Reset Local ({localIssuesCount})
          </button>
        )}
      </div>
    </div>
  );
});

PageHeader.displayName = "PageHeader";

export default PageHeader;