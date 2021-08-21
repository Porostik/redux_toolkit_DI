import { Error, IErrorCreator } from "../../types/errors";

export class ErrorCreator implements IErrorCreator {
  private errors;

  constructor() {
    this.errors = require("./_errors.json");
  }

  getByHttpStatus(requestName?: string, status?: number): Error {
    let error;

    if (!status) {
      return { message: this.errors.httpStatus.commons.default };
    }

    if (requestName && status in this.errors.httpStatus[requestName]) {
      error = this.errors.httpStatus[requestName][status];
    }

    return { message: error || this.errors.httpStatus.commons.default };
  }
}
