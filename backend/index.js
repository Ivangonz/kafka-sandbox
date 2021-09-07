"use strict";
exports.__esModule = true;
var kafkajs_1 = require("kafkajs");
var confluent_schema_registry_1 = require("@kafkajs/confluent-schema-registry");
var KafkaProducer_1 = require("./kafkaProducer/KafkaProducer");
var kafkaConsumer_1 = require("./kafkaConsumer/kafkaConsumer");
var TOPIC = "test_topic";
// Create a new Kafka Client
var kafka = new kafkajs_1.Kafka({
    clientId: "some-client-id",
    brokers: ["localhost:9092"]
});
// Create a new Schema Registry
var registry = new confluent_schema_registry_1.SchemaRegistry({
    host: "http://localhost:8085"
});
// Initialize a new Producer from the Producer Helper class
var testProducer = new KafkaProducer_1["default"](kafka, registry, TOPIC);
// Initialize a new Consumer from the Consumer Helper class
var testConsumer = new kafkaConsumer_1["default"](kafka, registry, TOPIC, "group_id_1");
testProducer.produce({ id: "2", value: 300 }).then(function () { return testConsumer.consume(); });
