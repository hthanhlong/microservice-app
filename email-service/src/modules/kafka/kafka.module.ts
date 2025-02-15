import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';
import { MailerModule } from '../mailer/mailer.module';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'email-service',
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
    MailerModule,
  ],
  controllers: [KafkaController],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
