import { Error } from "./errors";

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ITodosReducersState {
  list: ITodo[];
  loading: boolean;
  error: Error | null;
  current: ITodo | null;
}
