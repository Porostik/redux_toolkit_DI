import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITodosApi } from "../../types/api";
import { Error } from "../../types/errors";
import { ITodo } from "../../types/todo";

export class TodosAsyncActions {
  private api;

  constructor(_api: ITodosApi) {
    this.api = _api;
  }

  fetchTodos = createAsyncThunk<ITodo[], undefined, { rejectValue: Error }>(
    "allTodos",
    async (_payload, thunkAPI) => {
      try {
        const { data, error } = await this.api.getAll();

        if (error) return thunkAPI.rejectWithValue(error);

        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  fetchCurrentTodo = createAsyncThunk<ITodo, number, { rejectValue: Error }>(
    "currentTodo",
    async (payload, thunkAPI) => {
      try {
        const { data, error } = await this.api.getCurrent(payload);
        console.log(error);

        if (error) return thunkAPI.rejectWithValue(error);

        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
}
