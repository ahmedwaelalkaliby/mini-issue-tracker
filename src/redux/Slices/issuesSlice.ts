import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Issue } from "../../types/types";
import { fetchIssues } from "./issuesThunk";

interface State {
  list: Issue[];
  loading: boolean;
}

const loadLocalIssues = (): Issue[] => {
  try {
    const data = localStorage.getItem("localIssues");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState: State = {
  list: loadLocalIssues(),
  loading: false,
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    addIssue(state, action: PayloadAction<Omit<Issue, "id">>) {
      const issue: Issue = {
        ...action.payload,
        id: crypto.randomUUID(), // ✅ SAFE & BUILD-FRIENDLY
      };

      state.list.unshift(issue);

      const localIssues = state.list.filter(i => i.isLocal);
      localStorage.setItem("localIssues", JSON.stringify(localIssues));
    },

    resetLocal(state) {
      state.list = state.list.filter(i => !i.isLocal);
      localStorage.removeItem("localIssues");
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchIssues.pending, state => {
        state.loading = true;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.loading = false;
        const localIssues = state.list.filter(i => i.isLocal);
        state.list = [...localIssues, ...action.payload];
      })
      .addCase(fetchIssues.rejected, state => {
        state.loading = false;
      });
  },
});

export const { addIssue, resetLocal } = issuesSlice.actions;
export default issuesSlice.reducer;
