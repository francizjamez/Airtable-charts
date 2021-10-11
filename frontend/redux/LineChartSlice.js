import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  table: null,
  data: null,
};

export const lineChartSlice = createSlice({
  name: "lineChart",
  initialState,
  reducers: {
    setTable: (state, action) => {
      state.table = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTable, setData } = lineChartSlice.actions;

export default lineChartSlice.reducer;
