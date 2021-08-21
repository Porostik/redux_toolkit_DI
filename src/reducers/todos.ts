import { createSlice } from "@reduxjs/toolkit";

import { todosApi } from "../modules/api";
import { TodosAsyncActions } from "../modules/asyncActions/todos";
import { ITodosReducersState } from "../types/todo";

const initialState: ITodosReducersState = {
  list: [],
  error: null,
  loading: false,
  current: null,
};

export const todosAsyncActions = new TodosAsyncActions(todosApi);

const slice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todosAsyncActions.fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(todosAsyncActions.fetchTodos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.list = payload;
        state.error = null;
      })
      .addCase(todosAsyncActions.fetchTodos.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as Error;
      })
      .addCase(todosAsyncActions.fetchCurrentTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        todosAsyncActions.fetchCurrentTodo.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.current = payload;
          state.error = null;
        }
      )
      .addCase(
        todosAsyncActions.fetchCurrentTodo.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.current = null;
          state.error = payload as Error;
        }
      );
  },
});

const { reducer } = slice;

export const todos = reducer;
