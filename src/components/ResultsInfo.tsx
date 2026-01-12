import { memo } from "react";

interface ResultsInfoProps {
  filteredCount: number;
  totalCount: number;
}

const ResultsInfo = memo(({ filteredCount, totalCount }: ResultsInfoProps) => {
  return (
    <div className="mb-4 text-sm text-gray-600">
      Showing {filteredCount} of {totalCount} issues
    </div>
  );
});

ResultsInfo.displayName = "ResultsInfo";

export default ResultsInfo;