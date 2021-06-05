using System;
using System.Collections.Generic;
using System.Linq;
using ghost_bi_backend.Models;

namespace ghost_bi_backend
{
    public class DataSeed
    {
        private readonly BiDbContext ctx;
        public DataSeed(BiDbContext ctx)
        {
            this.ctx = ctx;
        }

        public void SeedData(int nCustomers, int nOrders)
        {
            if(!ctx.Customers.Any())
            {
                SeedCustomers(nCustomers);
                ctx.SaveChanges();
            }

            if(!ctx.Orders.Any())
            {
                SeedOrders(nOrders);
                ctx.SaveChanges();
            }
            
            if(!ctx.Servers.Any())
            {
                SeedServers();
                ctx.SaveChanges();
            }            
        }

        private void SeedCustomers(int nCustomers)
        {
            List<Customer> customers = BuildCustomerList(nCustomers);
            foreach (var customer in customers)
            {
                ctx.Customers.Add(customer);
            }
        }

        private void SeedOrders(int nOrders)
        {
            List<Order> orders = BuildOrdersList(nOrders);
            foreach (var order in orders)
            {
                ctx.Orders.Add(order);
            }
        }

        private void SeedServers()
        {
            List<Server> servers = BuildServerList();
            foreach (var server in servers)
            {
                ctx.Servers.Add(server);
            }
        }

        private List<Customer> BuildCustomerList(int nCustomers)
        {
            var customers = new List<Customer>();
            var names = new List<string>();

            for (int i = 1; i <= nCustomers; i++)
            {
                var name = Helpers.MakeUniqueCustomerName(names);
                names.Add(name);
                
                customers.Add(new Customer(){
                    Id = i,
                    Name = name,
                    Email = Helpers.MakeCustomerEmail(name),
                    State = Helpers.GetRandomState()
                });
            }

            return customers;
        }

        private List<Order> BuildOrdersList(int nOrders)
        {
            var orders = new List<Order>();
            var rand = new Random();

            for (int i = 1; i <= nOrders; i++)
            {
                var randCustomerId = rand.Next(1, ctx.Customers.Count());
                var placed = Helpers.GetRandomOrderPlaced();
                var completed = Helpers.GetRandomOrderCompleted(placed);
                var customers = ctx.Customers.ToList();

                orders.Add(new Order(){
                    Id = i,
                    Customer = ctx.Customers.First(c => c.Id == randCustomerId),
                    Total = Helpers.GetRandomOrderTotal(),
                    Placed = placed,
                    Completed = completed
                });
            }

            return orders;
        }

        private List<Server> BuildServerList()
        {
            return new List<Server>()
            {
                new Server()
                {
                    Id = 1,
                    Name = "Dev-Web",
                    IsOnline = true
                },
                new Server()
                {
                    Id = 2,
                    Name = "Dev-Mail",
                    IsOnline = false
                },
                new Server()
                {
                    Id = 3,
                    Name = "Dev-Services",
                    IsOnline = true
                },
                new Server()
                {
                    Id = 4,
                    Name = "QA-Web",
                    IsOnline = true
                },
                new Server()
                {
                    Id = 5,
                    Name = "QA-Mail",
                    IsOnline = false
                },
                new Server()
                {
                    Id = 6,
                    Name = "QA-Services",
                    IsOnline = true
                },
                new Server()
                {
                    Id = 7,
                    Name = "Prod-Web",
                    IsOnline = true
                },
                new Server()
                {
                    Id = 8,
                    Name = "Prod-Mail",
                    IsOnline = true
                },
                new Server()
                {
                    Id = 9,
                    Name = "Prod-Services",
                    IsOnline = true
                },
            };
        }
    }
}