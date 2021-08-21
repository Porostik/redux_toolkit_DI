import axios, { AxiosInstance } from "axios";

export class BaseApi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "https://jsonplaceholder.typicode.com/",
      validateStatus: (status) => true,
    });
  }

  public get(url: string) {
    return this.api.get(url);
  }
}
