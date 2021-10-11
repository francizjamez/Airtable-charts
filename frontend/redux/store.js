import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import lineChartReducer from "./LineChartSlice";
import { setAutoFreeze } from "immer";

setAutoFreeze(false);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    lineChart: lineChartReducer,
  },
});
