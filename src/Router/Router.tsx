import { createBrowserRouter } from "react-router-dom";
import IssueDetails from "../pages/IssueDetails";
import IssuesList from "../pages/IssuesList";
import CreateNewIssue from "../pages/CreateNewIssue";



export const router = createBrowserRouter([
  { path: "/", element: <IssuesList /> },
  { path: "/issue-details/:issueId", element: <IssueDetails /> },   
  { path: "/create-issue", element: <CreateNewIssue /> },
  ]);