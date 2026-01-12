import { memo } from "react";

interface ClearFiltersButtonProps {
  onClick: () => void;
}

const ClearFiltersButton = memo(({ onClick }: ClearFiltersButtonProps) => {
  return (
    <div className="flex justify-end">
      <button
        onClick={onClick}
        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        Clear all filters
      </button>
    </div>
  );
});

ClearFiltersButton.displayName = "ClearFiltersButton";

export default ClearFiltersButton;