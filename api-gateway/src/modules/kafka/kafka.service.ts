import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService {
  private readonly kafka = new Kafka({
    clientId: 'api-gateway',
    brokers: ['localhost:9092'],
  });
  private readonly producer = this.kafka.producer();
  private readonly consumer = this.kafka.consumer({
    groupId: 'api-gateway-group',
  });

  async requestRefreshToken(refreshToken: string): Promise<string> {
    await this.producer.connect();

    await this.producer.send({
      topic: 'refresh-token',
      messages: [{ value: JSON.stringify({ refreshToken }) }],
    });

    await this.producer.disconnect();

    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'refresh-token-response' });

    let newAccessToken = null;

    await this.consumer.run({
      eachMessage: ({ message }) => {
        const data = JSON.parse(message.value.toString());
        newAccessToken = data.accessToken;
      },
    });

    return newAccessToken;
  }
}
