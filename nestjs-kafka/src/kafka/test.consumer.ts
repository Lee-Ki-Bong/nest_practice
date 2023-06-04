import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  /**
   * @override OnModuleInit
   */
  async onModuleInit() {
    await this.consumerService.consumer(
      { topics: ['test'] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          });
        },
      },
    );
  }
}
