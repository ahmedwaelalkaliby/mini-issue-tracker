import { memo } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = memo(({ value, onChange }: SearchInputProps) => {
  return (
    <div>
      <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
        Search
      </label>
      <div className="relative">
        <input
          id="search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by title or description..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
    </div>
  );
});

SearchInput.displayName = "SearchInput";

export default SearchInput;