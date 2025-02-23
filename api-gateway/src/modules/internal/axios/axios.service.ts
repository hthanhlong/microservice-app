import { Logger, OnModuleInit } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import axios from 'axios';
@Injectable()
export class AxiosService {
  private axiosInstance: AxiosInstance;
  constructor(
    @Inject('AXIOS_BASE_URL')
    private readonly axiosBaseUrl: string,
  ) {
    this.axiosInstance = axios.create({
      baseURL: this.axiosBaseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

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
