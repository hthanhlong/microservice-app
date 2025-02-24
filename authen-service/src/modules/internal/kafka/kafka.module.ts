import { DynamicModule, Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ClientsModule } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { KafkaConsumer } from './kafka.consumer';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({})
export class KafkaModule {
  static register(groupId: string): DynamicModule {
    return {
      module: KafkaModule,
      imports: [
        ConfigModule,
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
                  consumer: {
                    groupId: groupId,
                  },
                },
              };
            },
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [KafkaService, KafkaConsumer],
      providers: [KafkaService, KafkaConsumer],
    };
  }
}
