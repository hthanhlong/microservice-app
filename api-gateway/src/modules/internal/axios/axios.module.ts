import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AxiosService } from './axios.service';
import { Logger } from '@nestjs/common';
const logger = new Logger('AxiosModule');

@Module({})
export class AxiosModule {
  static register(serviceName: string): DynamicModule {
    return {
      module: AxiosModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'AXIOS_BASE_URL',
          useFactory: (configService: ConfigService) =>
            configService.get<string>(`services.${serviceName}.url`),
          inject: [ConfigService],
        },
        AxiosService,
      ],
      exports: [AxiosService],
    };
  }
}
