import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues } from "../redux/Slices/issuesThunk";
import { resetLocal } from "../redux/Slices/issuesSlice";
import type { RootState, AppDispatch } from "../redux/Store";
import IssueList from "../components/IssueList";
import FilterBar, { type FilterState } from "../components/FilterBar";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import ResultsInfo from "../components/ResultsInfo";
import LoadingSpinner from "../components/LoadingSpinner";
import { filterAndSortIssues } from "../utils/filterUtils";

const initialFilters: FilterState = {
  search: "",
  status: "all",
  priority: "all",
  sortBy: "newest",
};

export default function IssuesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.issues);
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  useEffect(() => {
    const hasApiIssues = list.some((issue) => !issue.isLocal);
    if (!hasApiIssues) {
      dispatch(fetchIssues());
    }
  }, [dispatch, list]);

  // Memoize filtered issues
  const filteredIssues = useMemo(
    () => filterAndSortIssues(list, filters),
    [list, filters]
  );

  // Memoize counts
  const localIssuesCount = useMemo(
    () => list.filter((i) => i.isLocal).length,
    [list]
  );

  const hasActiveFilters = useMemo(
    () =>
      filters.search ||
      filters.status !== "all" ||
      filters.priority !== "all" ||
      filters.sortBy !== "newest",
    [filters]
  );

  // Memoize callbacks
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const handleResetLocal = useCallback(() => {
    if (window.confirm(`Delete all ${localIssuesCount} local issues?`)) {
      dispatch(resetLocal());
    }
  }, [dispatch, localIssuesCount]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <PageHeader
          totalIssues={list.length}
          localIssuesCount={localIssuesCount}
          onResetLocal={handleResetLocal}
        />

        {list.length > 0 && (
          <div className="mb-6">
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        )}

        {hasActiveFilters && list.length > 0 && (
          <ResultsInfo filteredCount={filteredIssues.length} totalCount={list.length} />
        )}

        {list.length === 0 ? (
          <EmptyState type="no-issues" />
        ) : filteredIssues.length === 0 ? (
          <EmptyState type="no-results" onClearFilters={handleClearFilters} />
        ) : (
          <IssueList issues={filteredIssues} />
        )}
      </div>
    </div>
  );
}