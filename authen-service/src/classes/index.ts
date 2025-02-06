export class ResponseStandard {
  hasError: boolean;
  errorCode: number;
  message: string;
  data: unknown;
  constructor(
    hasError: boolean,
    errorCode: number,
    message: string,
    data: unknown,
  ) {
    this.hasError = hasError;
    this.errorCode = errorCode;
    this.message = message;
    this.data = data;
  }
}
