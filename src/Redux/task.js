import { createSlice } from "@reduxjs/toolkit";

// Helper: Load tasks for a specific user
const loadTasks = (userId) => {
  const tasks = localStorage.getItem(`tasks_${userId}`);
  return tasks ? JSON.parse(tasks) : [];
};

// Helper: Save tasks for a specific user
const saveTasks = (userId, tasks) => {
  localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],   // empty initially, will load after login
  },
  reducers: {
    loadUserTasks: (state, action) => {
      const userId = action.payload;
      state.tasks = loadTasks(userId);
    },
    addTask: (state, action) => {
      const { userId, ...task } = action.payload;
      state.tasks.push(task);
      saveTasks(userId, state.tasks);
    },
    deleteTask: (state, action) => {
      const { id, userId } = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
      saveTasks(userId, state.tasks);
    },
  },
});

export const { addTask, deleteTask, loadUserTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
