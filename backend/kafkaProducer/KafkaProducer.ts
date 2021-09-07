import { Kafka } from 'kafkajs';
import {
    SchemaRegistry,
    readAVSCAsync,
  } from "@kafkajs/confluent-schema-registry";

// Simple Kafka Producer helper class
export default class KafkaProducer {
  kafkaClient: Kafka;
  schemaRegistry: SchemaRegistry;
  topic: string;

  constructor(kafkaClient: Kafka, schemaRegistry: SchemaRegistry, topic: string) {
    this.kafkaClient = kafkaClient;
    this.schemaRegistry = schemaRegistry;
    this.topic = topic;
  };

  
  produceToKafka = async (registryId: number, message: any) => {
    const producer = this.kafkaClient.producer(); 
    await producer.connect();
  
    const outgoingMessage = {
      key: message.id,
      value: await this.schemaRegistry.encode(registryId, message),
    };
  
    await producer.send({
      topic: this.topic,
      messages: [outgoingMessage],
    });
  
    await producer.disconnect();
  };

  createTopic = async () => {
    try {
      const topicExists = (await this.kafkaClient.admin().listTopics()).includes(this.topic);
      if (!topicExists) {
        await this.kafkaClient.admin().createTopics({
          topics: [
            {
              topic: this.topic,
              numPartitions: 1,
              replicationFactor: 1,
            },
          ],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  produce = async (message: any) => {
    await this.createTopic();
    try {
      const registryId = await this.registerSchema();
      // push example message
      if (registryId) {
        await this.produceToKafka(registryId, message);
        console.log(`Produced message to Kafka: ${JSON.stringify(message)}`);
      }
    } catch (error) {
      console.log(`There was an error producing the message: ${error}`);
    }
  };

  registerSchema = async () => {
    try {
      const schema = await readAVSCAsync("./schema.avsc");
      const { id } = await this.schemaRegistry.register(schema);
      return id;
    } catch (e) {
      console.log(e);
    }
  }
}