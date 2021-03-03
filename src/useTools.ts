import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useReducer } from "react";
import groupBy from "lodash/fp/groupBy";
import { mapDispatchToActions } from "./utils";
import { LocalStorage } from "./LocalStorage";

export enum ToolCategory {
  Uncategorized,
  Beginner,
  SelfSufficient,
  Advanced,
  Mastery,
}

export interface Tool {
  label: string;
  category: ToolCategory;
}

interface ToolsState {
  tools: Tool[];
}

const initialState: ToolsState = {
  tools: LocalStorage.getItem("tools", []),
};

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    changeCategory(state, action: PayloadAction<{ label: string; newCategory: ToolCategory }>) {
      state.tools = state.tools.map((tool) => {
        if (tool.label === action.payload.label) {
          return { ...tool, category: action.payload.newCategory };
        }
        return tool;
      });
      persistState(state);
    },
    addTool(state, action: PayloadAction<string>) {
      state.tools.push({
        label: action.payload,
        category: ToolCategory.Uncategorized,
      });
      persistState(state);
    },
    removeTool(state, action: PayloadAction<string>) {
      state.tools = state.tools.filter((tool) => tool.label !== action.payload);
      persistState(state);
    },
  },
});

function persistState(state: ToolsState) {
  LocalStorage.setItem("tools", state.tools);
}

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
