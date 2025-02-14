import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosService {
  constructor() {}

  async post<T>(url: string, data: any): Promise<T> {
    const result = await axios.post(url, data);
    return result.data as T;
  }

  async get<T>(url: string): Promise<T> {
    const result = await axios.get(url);
    return result.data as T;
  }

  async put<T>(url: string, data: any): Promise<T> {
    const result = await axios.put(url, data);
    return result.data as T;
  }

  async delete<T>(url: string): Promise<T> {
    const result = await axios.delete(url);
    return result.data as T;
  }
}
