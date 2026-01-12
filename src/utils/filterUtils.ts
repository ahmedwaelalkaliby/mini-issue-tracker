import type { Issue } from "../types/types";
import type { FilterState } from "../components/FilterBar";

const priorityOrder: Record<string, number> = {
  High: 3,
  Medium: 2,
  Low: 1,
};

/**
 * Filters and sorts issues based on the provided filter state
 * @param issues - Array of issues to filter and sort
 * @param filters - Filter state containing search, status, priority, and sort criteria
 * @returns Filtered and sorted array of issues
 */
export function filterAndSortIssues(issues: Issue[], filters: FilterState): Issue[] {
  let filtered = [...issues];

  // Apply search filter (case-insensitive search in title and body)
  if (filters.search.trim()) {
    const searchLower = filters.search.toLowerCase().trim();
    filtered = filtered.filter(
      (issue) =>
        issue.title.toLowerCase().includes(searchLower) ||
        issue.body.toLowerCase().includes(searchLower)
    );
  }

  // Apply status filter
  if (filters.status !== "all") {
    filtered = filtered.filter((issue) => issue.status === filters.status);
  }

  // Apply priority filter
  if (filters.priority !== "all") {
    filtered = filtered.filter((issue) => issue.priority === filters.priority);
  }

  // Apply sorting
  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case "newest":
        // Sort by creation date - newest first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      
      case "oldest":
        // Sort by creation date - oldest first
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      
      case "priority-high":
        // Sort by priority - High to Low
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      
      case "priority-low":
        // Sort by priority - Low to High
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      
      default:
        return 0;
    }
  });

  return filtered;
}

/**
 * Checks if any filters are active
 * @param filters - Filter state to check
 * @returns True if any filter is active
 */
export function hasActiveFilters(filters: FilterState): boolean {
  return (
    filters.search.trim() !== "" ||
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.sortBy !== "newest"
  );
}

/**
 * Gets the count of issues matching specific criteria
 * @param issues - Array of issues
 * @param isLocal - Whether to count only local issues
 * @returns Count of matching issues
 */
export function getIssuesCount(issues: Issue[], isLocal?: boolean): number {
  if (isLocal === undefined) {
    return issues.length;
  }
  return issues.filter((issue) => issue.isLocal === isLocal).length;
}