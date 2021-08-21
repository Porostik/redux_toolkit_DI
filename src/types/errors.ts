export type Error = {
  message: string;
};

export interface IErrorCreator {
  getByHttpStatus(requestName?: string, status?: number): Error;
}
