import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Issue, Priority, Status } from "../../types/types.ts";


interface ApiPost {
  id: number;
  title: string;
  body: string;
}

export const fetchIssues = createAsyncThunk<Issue[]>(
  "issues/fetch",
  async () => {
    const res = await axios.get<ApiPost[]>(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const issues: Issue[] = res.data.slice(0, 20).map((post) => {
      const index = post.id % 3;

      return {
        id: `api-${post.id}`, 
        title: post.title,
        body: post.body, 
        status: ["Open", "In Progress", "Closed"][index] as Status,
        priority: ["Low", "Medium", "High"][index] as Priority,
        createdAt: new Date().toISOString(),
      };
    });

    return issues;
  }
);
