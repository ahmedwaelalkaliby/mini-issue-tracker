import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export default function IssueDetails() {
  const { issueId } = useParams<{ issueId: string }>();
  const navigate = useNavigate();
  const issue = useSelector((state: RootState) => 
    state.issues.list.find((i) => String(i.id) === issueId)
  );

  if (!issue) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
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
   <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
  <div className="w-full max-w-2xl">
    <button 
      onClick={() => navigate("/")} 
      className="mb-6 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M10 19l-7-7m0 0l7-7m-7 7h18" 
        />
      </svg>
      Back to Issues
    </button>
    
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">{issue.title}</h1>
      
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg border border-blue-200 text-sm font-medium">
          {issue.status}
        </span>
        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-lg border border-purple-200 text-sm font-medium">
          {issue.priority}
        </span>
        {issue.isLocal && (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-lg border border-green-200 text-sm font-medium">
            Local
          </span>
        )}
      </div>
      
      <p className="text-gray-600 text-sm mb-6">
        Created: {new Date(issue.createdAt).toLocaleString()}
      </p>
      
      <div className="border-t border-gray-200 pt-6">
        <h2 className="font-bold text-lg mb-3 text-gray-900">Description:</h2>
        <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{issue.body}</p>
      </div>
    </div>
  </div>
</div>
  );
}