import { memo } from "react";
import type { Issue } from "../types/types";
import IssueRow from "./IssueRow";

interface IssueListProps {
  issues: Issue[];
}

const IssueList = memo(({ issues }: IssueListProps) => {
  if (issues.length === 0) return null;

  return (
    <div className="space-y-2">
      {issues.map((issue) => (
        <IssueRow key={issue.id} issue={issue} />
      ))}
    </div>
  );
});

IssueList.displayName = "IssueList";

export default IssueList;