import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useReducer } from "react";
import { mapDispatchToActions } from "./utils";

export interface Tool {
  id: string;
  label: string;
}

interface ToolsState {
  tools: Tool[];
  beginner: Tool[];
  selfSufficient: Tool[];
  advanced: Tool[];
  mastery: Tool[];
}

const initialState: ToolsState = {
  tools: [{ id: "test", label: "test" }],
  beginner: [{ id: "another", label: "label" }],
  selfSufficient: [],
  advanced: [],
  mastery: [],
};

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    moveToBeginner(state, action: PayloadAction<Tool["id"]>) {
      const index = state.tools.findIndex((tool) => tool.id === action.payload);
      if (index === -1) {
        throw new Error(`tool is missing: ${action.payload}`);
      }
      const [tool] = state.tools.splice(index, 1);
      state.beginner.push(tool);
    },
  },
});

export function useToolsReducer() {
  const [state, dispatch] = useReducer(toolsSlice.reducer, initialState);
  const actions = mapDispatchToActions(dispatch, toolsSlice.actions);

  return {
    state,
    actions,
  };
}
