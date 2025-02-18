import { Module, Global } from '@nestjs/common';
import { AxiosService } from './axios.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
@Global()
@Module({
  providers: [
    {
      provide: 'AXIOS_INSTANCE',
      useFactory: (configService: ConfigService) =>
        axios.create({
          baseURL: configService.get<string>('axios.instance'),
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      inject: [ConfigService],
    },
    AxiosService,
  ],
  exports: [AxiosService],
})
export class AxiosModule {}
