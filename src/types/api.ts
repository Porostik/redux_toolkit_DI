import { Error } from "./errors";
import { ITodo } from "./todo";

export interface BaseResponse<T> {
  error: Error | null;
  data: T;
  status: number;
}

export interface ITodosApi {
  getAll: () => Promise<BaseResponse<ITodo[]>>;
  getCurrent: (id: number) => Promise<BaseResponse<ITodo>>;
}
