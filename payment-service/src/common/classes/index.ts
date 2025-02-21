export class IRes<T> {
  hasError: boolean;
  errorCode: number;
  message: string;
  data: T;
  statusCode: number;
  constructor(hasError: boolean, errorCode: number, message: string, data: T) {
    this.hasError = hasError;
    this.errorCode = errorCode;
    this.message = message;
    this.data = data;
    this.statusCode = hasError ? 400 : 200;
  }
}

export class IErrorRes {
  hasError: boolean;
  statusCode: number;
  errorCode: number;
  constructor(errorCode: number) {
    this.hasError = true;
    this.statusCode = 400;
    this.errorCode = errorCode;
  }
}
