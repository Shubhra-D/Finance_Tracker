import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/auth"; // Ensure this path is correct
import tasksReducer from '../Redux/task';

const store = configureStore({
  reducer: {
    auth: authReducer, 
    tasks:tasksReducer,
  },
});

export default store;
