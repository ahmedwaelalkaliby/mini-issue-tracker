import type { Issue } from "../types/types";
import IssueRow from "./IssueRow";


export default function IssueList({ issues }: { issues: Issue[] }) {
  if (issues.length === 0) return <p>No issues found.</p>;

  return (
    <div className="space-y-2">
      {issues.map(issue => (
        <IssueRow key={issue.id} issue={issue} />
      ))}
    </div>
  );
}
