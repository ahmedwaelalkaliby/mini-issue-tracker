import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/Store";

export default function IssueDetails() {
  const { issueId } = useParams<{ issueId: string }>();
  const navigate = useNavigate();
  const issue = useSelector((state: RootState) => 
    state.issues.list.find(i => String(i.id) === issueId)
  );

  if (!issue) {
    return (
      <div className="p-6">
        <p>Issue not found</p>
        <button 
          onClick={() => navigate("/")} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Issues
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl">
      <button 
        onClick={() => navigate("/")} 
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        ← Back
      </button>
      
      <h1 className="text-3xl font-bold mb-4">{issue.title}</h1>
      
      <div className="mb-4 flex gap-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
          {issue.status}
        </span>
        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded">
          {issue.priority}
        </span>
        {issue.isLocal && (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded">
            Local
          </span>
        )}
      </div>
      
      <p className="text-gray-600 mb-4">
        Created: {new Date(issue.createdAt).toLocaleString()}
      </p>
      
      <div className="border-t pt-4">
        <h2 className="font-bold mb-2">Description:</h2>
        <p className="whitespace-pre-wrap">{issue.body}</p>
      </div>
    </div>
  );
}