// src/store/tasksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  date: string; // "YYYY-MM-DD"
  color: string;
}

export interface NewTaskPayload {
  title: string;
  description?: string;
  priority: Priority;
  startTime: string;
  endTime: string;
  date: string;
  color: string;
}

interface TasksState {
  byId: Record<string, Task>;
  allIds: string[];
}

const initialState: TasksState = {
  byId: {},
  allIds: [],
};

// Optional: seed sample data for dev (remove in prod)
const seedSample = (state: TasksState) => {
  const samples: Task[] = [
    { id: "1", title: "Team Sync", startTime: "09:15", endTime: "09:45", color: "#60A5FA", date: "2025-11-20", priority: "medium", description: "Daily sync" },
    { id: "2", title: "Code Review", startTime: "10:00", endTime: "11:30", color: "#FACC15", date: "2025-11-20", priority: "high" },
    { id: "3", title: "Lunch", startTime: "13:00", endTime: "14:00", color: "#34D399", date: "2025-11-20", priority: "low" },
  ];
  for (const t of samples) {
    state.byId[t.id] = t;
    state.allIds.push(t.id);
  }
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<NewTaskPayload>) => {
      const id = crypto.randomUUID();
      const task: Task = { id, ...action.payload };
      state.byId[id] = task;
      state.allIds.push(id);
    },
    updateTask: (state, action: PayloadAction<{ id: string; updates: Partial<Task> }>) => {
      const { id, updates } = action.payload;
      if (state.byId[id]) {
        state.byId[id] = { ...state.byId[id], ...updates };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.byId[id]) {
        delete state.byId[id];
        state.allIds = state.allIds.filter((tid) => tid !== id);
      }
    },
    // helper for dev to seed tasks (optional)
    seed: (state) => {
      seedSample(state);
    },
    // clear all (optional)
    clearAll: (state) => {
      state.byId = {};
      state.allIds = [];
    },
  },
});

export const { addTask, updateTask, deleteTask, seed, clearAll } = tasksSlice.actions;
export default tasksSlice.reducer;
