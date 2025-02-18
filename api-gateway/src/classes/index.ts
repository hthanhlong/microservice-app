export class IRes<T> {
  hasError: boolean;
  errorCode: number;
  message: string;
  data: T;
  constructor(hasError: boolean, errorCode: number, message: string, data: T) {
    this.hasError = hasError;
    this.errorCode = errorCode;
    this.message = message;
    this.data = data;
  }
}
