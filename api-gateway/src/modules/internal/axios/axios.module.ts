import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AxiosService } from './axios.service';

@Module({})
export class AxiosModule {
  static register(serviceName: string): DynamicModule {
    return {
      module: AxiosModule,
      providers: [
        {
          provide: 'AXIOS_INSTANCE',
          useFactory: (configService: ConfigService) =>
            axios.create({
              baseURL: configService.get<string>(`services.${serviceName}.url`),
              headers: {
                'Content-Type': 'application/json',
              },
            }),
          inject: [ConfigService],
        },
        AxiosService,
      ],
      exports: ['AXIOS_INSTANCE', AxiosService],
    };
  }
}
