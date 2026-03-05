import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export type Priority = "low" | "medium" | "high";

type BaseItem = {
  id: string;
  title: string;
  color: string;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
};

export type CalendarEvent = BaseItem & {
  type: "event";
  startTime: string;
  endTime: string;
};

export type TaskItem = BaseItem & {
  type: "task";
  deadline: string;
};

export type ScheduleItem = CalendarEvent | TaskItem;

interface ScheduleState {
  items: ScheduleItem[];
}

const initialState: ScheduleState = {
  items: [],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addEvent: (
      state,
      action: PayloadAction<
        Omit<CalendarEvent, "id" | "createdAt" | "updatedAt" | "type">
      >
    ) => {
      state.items.push({
        id: uuid(),
        type: "event",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...action.payload,
      });
    },

    addTask: (
      state,
      action: PayloadAction<
        Omit<TaskItem, "id" | "createdAt" | "updatedAt" | "type">
      >
    ) => {
      state.items.push({
        id: uuid(),
        type: "task",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...action.payload,
      });
    },

    updateItem: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<ScheduleItem> }>
    ) => {
      const item = state.items.find((x) => x.id === action.payload.id);
      if (item) {
        Object.assign(item, action.payload.updates, {
          updatedAt: new Date().toISOString(),
        });
      }
    },

    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    duplicateItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((x) => x.id === action.payload);
      if (!item) return;

      state.items.push({
        ...item,
        id: uuid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    },

convertTaskToEvent: (
  state,
  action: PayloadAction<{
    id: string;
    startTime: string;
    endTime: string;
  }>
) => {
  const index = state.items.findIndex((x) => x.id === action.payload.id);
  if (index === -1) return;

  const item = state.items[index];
  if (item.type !== "task") return;

  state.items[index] = {
    ...item,
    type: "event",
    startTime: action.payload.startTime,
    endTime: action.payload.endTime,
    // remove deadline by simply not including it
    updatedAt: new Date().toISOString(),
  } as CalendarEvent;
},
  },
});

export const {
  addEvent,
  addTask,
  updateItem,
  deleteItem,
  duplicateItem,
  convertTaskToEvent,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
