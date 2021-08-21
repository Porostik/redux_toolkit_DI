import { BaseResponse, ITodosApi } from "../../types/api";
import { ITodo } from "../../types/todo";
import { ErrorCreator } from "../ErrorCreator";
import { BaseApi } from "./baseApi";

class TodosApi implements ITodosApi {
  private baseApi: BaseApi;
  private errorCreator: ErrorCreator;

  constructor(_baseApi: BaseApi, _errorCreator: ErrorCreator) {
    this.baseApi = _baseApi;
    this.errorCreator = _errorCreator;
  }

  async getAll(): Promise<BaseResponse<ITodo[]>> {
    try {
      const { data, status } = await this.baseApi.get("/todos");

      const response = {
        data,
        status,
        error: null,
      };

      if (status !== 200) {
        const error = this.errorCreator.getByHttpStatus("getAll", 500);
        return { ...response, error };
      }

      return response;
    } catch (e) {
      const error = this.errorCreator.getByHttpStatus();
      return Promise.reject(error);
    }
  }

  async getCurrent(id: number): Promise<BaseResponse<ITodo>> {
    try {
      const { data, status } = await this.baseApi.get(`/todos/${id}`);

      const response = {
        data,
        status,
        error: null,
      };

      if (status !== 200) {
        const error = this.errorCreator.getByHttpStatus("getCurrent", status);

        return { ...response, error };
      }

      return response;
    } catch (e) {
      const error = this.errorCreator.getByHttpStatus();
      return Promise.reject(error);
    }
  }
}

export const todosApi = new TodosApi(new BaseApi(), new ErrorCreator());
