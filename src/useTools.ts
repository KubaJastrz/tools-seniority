import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useReducer } from "react";
import groupBy from "lodash/fp/groupBy";
import { mapDispatchToActions } from "./utils";

export enum ToolCategory {
  Uncategorized,
  Beginner,
  SelfSufficient,
  Advanced,
  Mastery,
}

export interface Tool {
  id: string;
  label: string;
  category: ToolCategory;
}

interface ToolsState {
  tools: Tool[];
}

const initialState: ToolsState = {
  tools: [
    { id: "react", label: "React", category: ToolCategory.Uncategorized },
    { id: "vue", label: "Vue", category: ToolCategory.Uncategorized },
    { id: "angular", label: "Angular", category: ToolCategory.Uncategorized },
  ],
};

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    changeCategory(state, action: PayloadAction<{ id: string; newCategory: ToolCategory }>) {
      state.tools = state.tools.map((tool) => {
        if (tool.id === action.payload.id) {
          return { ...tool, category: action.payload.newCategory };
        }
        return tool;
      });
    },
  },
});

export function useToolsReducer() {
  const [state, dispatch] = useReducer(toolsSlice.reducer, initialState);
  const lists = groupBy((tool) => tool.category, state.tools);
  const actions = mapDispatchToActions(dispatch, toolsSlice.actions);

  return {
    state,
    lists: {
      uncategorized: lists[ToolCategory.Uncategorized] || [],
      beginner: lists[ToolCategory.Beginner] || [],
      selfSufficient: lists[ToolCategory.SelfSufficient] || [],
      advanced: lists[ToolCategory.Advanced] || [],
      mastery: lists[ToolCategory.Mastery] || [],
    },
    actions,
  };
}
