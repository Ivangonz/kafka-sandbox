import { Kafka } from "kafkajs";
import {
    SchemaRegistry,
  } from "@kafkajs/confluent-schema-registry";

export default class KafkaConsumer {
    kafkaClient: Kafka;
    topic: string;
    schemaRegistry: SchemaRegistry;
    groupId: string;

    constructor(kafkaClient: Kafka, schemaRegistry: SchemaRegistry, topic: string, groupId: string) {
        this.kafkaClient = kafkaClient;
        this.topic = topic;
        this.groupId = groupId;
        this.schemaRegistry = schemaRegistry;
      };

    consume = async () => {
        const consumer = this.kafkaClient.consumer({
            groupId: this.groupId,
        });

        await consumer.connect();

        await consumer.subscribe({
          topic: this.topic,
          fromBeginning: true,
        });
      
        await consumer.run({
          eachMessage: async ({ topic, partition, message }) => {
            if (message.value) {
              const value: any = await this.schemaRegistry.decode(message.value);
              console.log(value);
            }
          },
        });
    }
}