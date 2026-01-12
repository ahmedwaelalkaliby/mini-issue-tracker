import { useNavigate } from "react-router-dom";
import IssueForm from "../components/IssueForm";

export default function CreateNewIssue() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <button 
        onClick={() => navigate("/")} 
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        ← Back
      </button>
      
      <h1 className="text-2xl font-bold mb-4">Create New Issue</h1>
      <IssueForm />
    </div>
  );
}