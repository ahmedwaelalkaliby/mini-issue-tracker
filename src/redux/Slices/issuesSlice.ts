import type { Issue } from '../../types/types';
import { fetchIssues } from '../Slices/issuesThunk';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'; 

interface State {
    list: Issue[];
    loading: boolean;
}


const loadLocalIssues = (): Issue[] => {
  try {
    const localIssues = localStorage.getItem("localIssues");
    return localIssues ? JSON.parse(localIssues) : [];
  } catch (error) {
    console.error("Error loading local issues:", error);
    return [];
  }
};

const initialState: State = {
    list: loadLocalIssues(), 
    loading: false,
};

const slice = createSlice({
    name: 'issues',
    initialState,
    reducers: {
        addIssue(state, action: PayloadAction<Issue>) {
          state.list.unshift(action.payload); 
          
          
          const localIssues = state.list.filter(i => i.isLocal);
          localStorage.setItem("localIssues", JSON.stringify(localIssues));
        },
     
        resetLocal(state) {
          state.list = state.list.filter(i => !i.isLocal);
          localStorage.removeItem("localIssues");
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchIssues.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchIssues.fulfilled, (state, action) => {
            state.loading = false;
        
            const localIssues = state.list.filter(i => i.isLocal);
            state.list = [...localIssues, ...action.payload];
        });
        builder.addCase(fetchIssues.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { addIssue, resetLocal } = slice.actions;
export default slice.reducer;