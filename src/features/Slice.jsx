import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    createToPaste: (state, action) => {
      const pasteData = action.payload;
      state.pastes.push(pasteData);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully!");
    },
    updateToPaste: (state, action) => {
      const pasteData = action.payload;
      const index = state.pastes.findIndex((item) => {
        return item._id === pasteData._id;
      });
      if (index >= 0) {
        state.pastes[index] = pasteData;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully!");
      }
    },
    deleteToPaste: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste deleted successfully!");
      } else {
        toast.error("Paste not found!");
      }
    },
    removeAllPaste: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes deleted successfully!");
    },
    shareToPaste: (state, action) => {},
  },
});

export const {
  createToPaste,
  deleteToPaste,
  updateToPaste,
  deleteSlice,
  shareToPaste,
} = pasteSlice.actions;
export default pasteSlice.reducer;
