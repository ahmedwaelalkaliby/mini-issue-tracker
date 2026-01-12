import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues } from "../redux/Slices/issuesThunk";
import { resetLocal } from "../redux/Slices/issuesSlice";
import type { RootState, AppDispatch } from "../redux/Store";
import IssueList from "../components/IssueList";
import { Link } from "react-router-dom";

export default function IssuesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.issues);

  useEffect(() => {
    const hasApiIssues = list.some(issue => !issue.isLocal);
    if (!hasApiIssues) {
      dispatch(fetchIssues());
    }
  }, [dispatch, list]);

  const localIssuesCount = list.filter(i => i.isLocal).length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Issues List</h1>
        <div className="text-sm text-gray-600">
          Total: {list.length} issues {localIssuesCount > 0 && `(${localIssuesCount} local)`}
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <Link 
          to="/create-issue" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Create New Issue
        </Link>
        {localIssuesCount > 0 && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => {
              if (window.confirm(`Delete all ${localIssuesCount} local issues?`)) {
                dispatch(resetLocal());
              }
            }}
          >
            Reset Local Issues ({localIssuesCount})
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-600">Loading issues...</p>
        </div>
      ) : list.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No issues yet</p>
          <Link 
            to="/create-issue" 
            className="text-blue-500 hover:underline"
          >
            Create your first issue
          </Link>
        </div>
      ) : (
        <IssueList issues={list} />
      )}
    </div>
  );
}