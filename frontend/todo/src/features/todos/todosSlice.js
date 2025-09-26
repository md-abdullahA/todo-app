import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";


const todoApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/todos/",
});


export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await todoApi.get("/");
  return res.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const res = await todoApi.post("/", todo);
  return res.data;
});

export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (todo) => {
  const res = await todoApi.put(`/${todo.id}/`, {
    ...todo,
    completed: !todo.completed,
  });
  return res.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await todoApi.delete(`/${id}/`);
  return id;
});

const todosSlice = createSlice({
  name: "todos",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const i = state.items.findIndex((t) => t.id === action.payload.id);
        state.items[i] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
