import { Kafka } from 'kafkajs';
import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";
import KafkaProducer from "./kafkaProducer/KafkaProducer";
import KafkaConsumer from './kafkaConsumer/kafkaConsumer';


const TOPIC = "test_topic";

// Create a new Kafka Client
const kafka = new Kafka({
    clientId: "some-client-id",
    brokers: ["localhost:9092"],
});

// Create a new Schema Registry
const registry = new SchemaRegistry({
    host: "http://localhost:8085",
  });

// Initialize a new Producer from the Producer Helper class
const testProducer = new KafkaProducer(kafka, registry, TOPIC);

// Initialize a new Consumer from the Consumer Helper class
const testConsumer = new KafkaConsumer(kafka, registry, TOPIC, "group_id_1");
testProducer.produce({id: "2", value: 300}).then(() => testConsumer.consume());