import { memo } from "react";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  type: "no-issues" | "no-results";
  onClearFilters?: () => void;
}

const EmptyState = memo(({ type, onClearFilters }: EmptyStateProps) => {
  if (type === "no-issues") {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No issues yet</h3>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Get started by creating your first issue to track bugs, features, or tasks.
        </p>
        <Link
          to="/create-issue"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create your first issue
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        We couldn't find any issues matching your filters. Try adjusting your search criteria.
      </p>
      <button
        onClick={onClearFilters}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Clear all filters
      </button>
    </div>
  );
});

EmptyState.displayName = "EmptyState";

export default EmptyState;