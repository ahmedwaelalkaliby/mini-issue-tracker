import type { Issue } from "../types/types";
import { useNavigate } from "react-router-dom";

export default function IssueRow({ issue }: { issue: Issue }) {
  const navigate = useNavigate();

  return (
    <div
      className="p-3 border rounded cursor-pointer hover:bg-gray-100"
      onClick={() => navigate(`/issue-details/${issue.id}`)} // ✅ Fixed route
    >
      <h3 className="font-bold">{issue.title}</h3>
      <p className="text-sm text-gray-600">
        {issue.status} | {issue.priority} | {new Date(issue.createdAt).toLocaleDateString()}
        {issue.isLocal && <span className="ml-2 text-green-600">(Local)</span>}
      </p>
    </div>
  );
}