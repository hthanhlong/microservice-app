import { Injectable } from '@nestjs/common';
import { AxiosService } from '../../internal/axios/axios.service';

@Injectable()
export class ProductService {
  constructor(private readonly axiosService: AxiosService) {}
}
