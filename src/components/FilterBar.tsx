import { memo, useCallback, useMemo } from "react";
import SearchInput from "./SearchInput";
import FilterSelect from "./FilterSelect";
import ClearFiltersButton from "./ClearFiltersButton";

export interface FilterState {
  search: string;
  status: string;
  priority: string;
  sortBy: string;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "Open", label: "Open" },
  { value: "In Progress", label: "In Progress" },
  { value: "Closed", label: "Closed" },
];

const priorityOptions = [
  { value: "all", label: "All Priorities" },
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "priority-high", label: "Priority: High to Low" },
  { value: "priority-low", label: "Priority: Low to High" },
];

const FilterBar = memo(({ filters, onFilterChange, onClearFilters }: FilterBarProps) => {
  const hasActiveFilters = useMemo(
    () =>
      filters.search ||
      filters.status !== "all" ||
      filters.priority !== "all" ||
      filters.sortBy !== "newest",
    [filters]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      onFilterChange({ ...filters, search: value });
    },
    [filters, onFilterChange]
  );

  const handleStatusChange = useCallback(
    (value: string) => {
      onFilterChange({ ...filters, status: value });
    },
    [filters, onFilterChange]
  );

  const handlePriorityChange = useCallback(
    (value: string) => {
      onFilterChange({ ...filters, priority: value });
    },
    [filters, onFilterChange]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      onFilterChange({ ...filters, sortBy: value });
    },
    [filters, onFilterChange]
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-3">
      <SearchInput value={filters.search} onChange={handleSearchChange} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <FilterSelect
          id="status"
          label="Status"
          value={filters.status}
          options={statusOptions}
          onChange={handleStatusChange}
        />
        <FilterSelect
          id="priority"
          label="Priority"
          value={filters.priority}
          options={priorityOptions}
          onChange={handlePriorityChange}
        />
        <FilterSelect
          id="sortBy"
          label="Sort By"
          value={filters.sortBy}
          options={sortOptions}
          onChange={handleSortChange}
        />
      </div>

      {hasActiveFilters && <ClearFiltersButton onClick={onClearFilters} />}
    </div>
  );
});

FilterBar.displayName = "FilterBar";

export default FilterBar;