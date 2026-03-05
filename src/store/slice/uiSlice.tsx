// store/slice/taskModalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskModalState {
  modal: "addEdit" | null;
  selectedTaskId: number | null;
  addEditContext?: {
    prefillDate?: string;
    prefillTime?: string;
    editingTaskId?: number;
  };
}

const initialState: TaskModalState = {
  modal: null,
  selectedTaskId: null,
  addEditContext: {},
};

const taskModalSlice = createSlice({
  name: "taskModal",
  initialState,
  reducers: {
    openAddModal: (state, action: PayloadAction<{ prefillDate?: string; prefillTime?: string }>) => {
      state.modal = "addEdit";
      state.selectedTaskId = null;
      state.addEditContext = { ...action.payload };
    },
    openEditModal: (state, action: PayloadAction<{ taskId: number }>) => {
      state.modal = "addEdit";
      state.selectedTaskId = action.payload.taskId;
      state.addEditContext = { editingTaskId: action.payload.taskId };
    },
    closeModal: (state) => {
      state.modal = null;
      state.selectedTaskId = null;
      state.addEditContext = {};
    },
  },
});

export const { openAddModal, openEditModal, closeModal } = taskModalSlice.actions;
export default taskModalSlice.reducer;
