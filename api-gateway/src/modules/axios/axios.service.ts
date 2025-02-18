import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';

@Injectable()
export class AxiosService {
  constructor(
    @Inject('AXIOS_INSTANCE')
    private readonly axiosInstance: AxiosInstance,
  ) {}

  async post<T>(url: string, data: any): Promise<T> {
    const result = await this.axiosInstance.post(url, data);
    return result.data as T;
  }

  async get<T>(url: string): Promise<T> {
    const result = await this.axiosInstance.get(url);
    return result.data as T;
  }

  async put<T>(url: string, data: any): Promise<T> {
    const result = await this.axiosInstance.put(url, data);
    return result.data as T;
  }

  async delete<T>(url: string): Promise<T> {
    const result = await this.axiosInstance.delete(url);
    return result.data as T;
  }
}
