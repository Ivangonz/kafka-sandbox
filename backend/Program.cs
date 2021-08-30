// Simple example of a producer
using Confluent.Kafka;
using System;
using System.Threading;

namespace backend
{
    class Program
    {
        static void Main(string[] args)
        {
            var config = new ProducerConfig
            {
                BootstrapServers = "localhost:29092"
            };
            var producer = new ProducerBuilder<Null, string>(config).Build();
            Console.WriteLine("Sup dawg.");
            var i = 1;
            while (true) {
                i++;
                producer.ProduceAsync("customer-orders", new Message<Null, string> {Value=$"Testing from .NET {i}"});
                producer.Flush(TimeSpan.FromSeconds(10));
                Thread.Sleep(2000);
            }

        }
    }
}
