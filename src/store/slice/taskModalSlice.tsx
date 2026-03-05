// store/slice/taskModalsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskModalsState {
  activeModal: "add" | "edit" | null;
  selectedTaskId: number | null;
  prefillTime: string | null;
}

const initialState: TaskModalsState = {
  activeModal: null,
  selectedTaskId: null,
  prefillTime: null,
};

const taskModalsSlice = createSlice({
  name: "taskModals",
  initialState,
  reducers: {
    openAddModal: (state, action: PayloadAction<{ prefillTime?: string }>) => {
      state.activeModal = "add";
      state.selectedTaskId = null;
      state.prefillTime = action.payload.prefillTime || null;
    },
    openEditModal: (state, action: PayloadAction<{ taskId: number }>) => {
      state.activeModal = "edit";
      state.selectedTaskId = action.payload.taskId;
      state.prefillTime = null;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.selectedTaskId = null;
      state.prefillTime = null;
    },
  },
});

export const { openAddModal, openEditModal, closeModal } = taskModalsSlice.actions;
export default taskModalsSlice.reducer;
