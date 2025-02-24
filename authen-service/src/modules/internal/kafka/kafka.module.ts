import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ClientsModule } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const brokers = configService.get('KAFKA_BROKER').split(',');
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                brokers: brokers || [],
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [KafkaService],
  providers: [KafkaService],
})
export class KafkaModule {}
