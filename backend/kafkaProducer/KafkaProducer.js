"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var confluent_schema_registry_1 = require("@kafkajs/confluent-schema-registry");
// Simple Kafka Producer helper class
var KafkaProducer = /** @class */ (function () {
    function KafkaProducer(kafkaClient, schemaRegistry, topic) {
        var _this = this;
        this.produceToKafka = function (registryId, message) { return __awaiter(_this, void 0, void 0, function () {
            var producer, outgoingMessage;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        producer = this.kafkaClient.producer();
                        return [4 /*yield*/, producer.connect()];
                    case 1:
                        _b.sent();
                        _a = {
                            key: message.id
                        };
                        return [4 /*yield*/, this.schemaRegistry.encode(registryId, message)];
                    case 2:
                        outgoingMessage = (_a.value = _b.sent(),
                            _a);
                        return [4 /*yield*/, producer.send({
                                topic: this.topic,
                                messages: [outgoingMessage]
                            })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, producer.disconnect()];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.createTopic = function () { return __awaiter(_this, void 0, void 0, function () {
            var topicExists, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.kafkaClient.admin().listTopics()];
                    case 1:
                        topicExists = (_a.sent()).includes(this.topic);
                        if (!!topicExists) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.kafkaClient.admin().createTopics({
                                topics: [
                                    {
                                        topic: this.topic,
                                        numPartitions: 1,
                                        replicationFactor: 1
                                    },
                                ]
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.produce = function (message) { return __awaiter(_this, void 0, void 0, function () {
            var registryId, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createTopic()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        return [4 /*yield*/, this.registerSchema()];
                    case 3:
                        registryId = _a.sent();
                        if (!registryId) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.produceToKafka(registryId, message)];
                    case 4:
                        _a.sent();
                        console.log("Produced message to Kafka: " + JSON.stringify(message));
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        console.log("There was an error producing the message: " + error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.registerSchema = function () { return __awaiter(_this, void 0, void 0, function () {
            var schema, id, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, confluent_schema_registry_1.readAVSCAsync)("./schema.avsc")];
                    case 1:
                        schema = _a.sent();
                        return [4 /*yield*/, this.schemaRegistry.register(schema)];
                    case 2:
                        id = (_a.sent()).id;
                        return [2 /*return*/, id];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.kafkaClient = kafkaClient;
        this.schemaRegistry = schemaRegistry;
        this.topic = topic;
    }
    ;
    return KafkaProducer;
}());
exports["default"] = KafkaProducer;
