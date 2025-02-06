export interface IResponseStandard {
  hasError: boolean;
  errorCode: number;
  message: string;
  data: unknown;
}
