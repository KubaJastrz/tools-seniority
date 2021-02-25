import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useReducer } from "react";
import { mapDispatchToActions } from "./utils";

enum ToolCategory {
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
    { id: "test", label: "test", category: ToolCategory.Uncategorized },
    { id: "test2", label: "test2", category: ToolCategory.Beginner },
  ],
};

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    moveToBeginner: stateTransitionReducer(ToolCategory.Beginner),
    moveToSelfSufficient: stateTransitionReducer(ToolCategory.SelfSufficient),
    moveToAdvanced: stateTransitionReducer(ToolCategory.Advanced),
    moveToMastery: stateTransitionReducer(ToolCategory.Mastery),
    moveToTools: stateTransitionReducer(ToolCategory.Uncategorized),
  },
});

function stateTransitionReducer(targetCategory: ToolCategory) {
  return (state: ToolsState, action: PayloadAction<Tool["id"]>) => {
    state.tools = state.tools.map((tool) => {
      if (tool.id === action.payload) {
        return { ...tool, category: targetCategory };
      }
      return tool;
    });
  };
}

export function useToolsReducer() {
  const [state, dispatch] = useReducer(toolsSlice.reducer, initialState);
  const actions = mapDispatchToActions(dispatch, toolsSlice.actions);

  return {
    state,
    lists: {
      uncategorized: filterList(ToolCategory.Uncategorized, state.tools),
      beginner: filterList(ToolCategory.Beginner, state.tools),
      selfSufficient: filterList(ToolCategory.SelfSufficient, state.tools),
      advanced: filterList(ToolCategory.Advanced, state.tools),
      mastery: filterList(ToolCategory.Mastery, state.tools),
    },
    actions,
  };
}

const filterList = (category: ToolCategory, list: Tool[]) =>
  list.filter((tool) => tool.category === category);
