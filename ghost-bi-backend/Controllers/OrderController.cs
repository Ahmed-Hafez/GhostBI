using System;
using System.Linq;
using ghost_bi_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ghost_bi_backend.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly BiDbContext ctx;

        public OrderController(BiDbContext ctx)
        {
            this.ctx = ctx;
        }

        [HttpGet("{pageIndex:int}/{pageSize:int}")]
        public IActionResult Get(int pageIndex, int pageSize)
        {
            var data = ctx.Orders.Include(o => o.Customer).OrderByDescending(c => c.Placed);
            var page = new PaginatedResponse<Order>(data, pageIndex, pageSize);

            var totalCount = data.Count();
            var totalPages = Math.Ceiling((double)totalCount / pageSize);

            var response = new
            {
                Page = page,
                TotalPages = totalPages
            };

            return Ok(response);
        }

        [HttpGet("bystate")]
        public IActionResult ByState()
        {
            var orders = ctx.Orders.Include(o => o.Customer).ToList();
            var groupedResult = orders
                .GroupBy(r => r.Customer.State)
                .ToList()
                .Select(grp => new 
                {
                    State = grp.Key,
                    Total = grp.Sum(x => x.Total)
                }).OrderByDescending(r => r.Total)
                .ToList();

            return Ok(groupedResult);
        }

        [HttpGet("bycustomer/{n}")]
        public IActionResult ByCustomer(int n)
        {
            var orders = ctx.Orders.Include(o => o.Customer).ToList();
            var groupedResult = orders
                .GroupBy(r => r.Customer.Id)
                .ToList()
                .Select(grp => new
                {
                    Name = ctx.Customers.Find(grp.Key).Name,
                    Total = grp.Sum(x => x.Total)
                }).OrderByDescending(r => r.Total)
                .Take(n)
                .ToList();

            return Ok(groupedResult);
        }

        // GET api/order/5
        [HttpGet("getorder/{id}", Name ="GetOrder")]
        public Order GetOrder(int id)
        {
            return ctx.Orders.Include(o => o.Customer)
                .First(o => o.Id == id);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Order order)
        {
            if (order == null)
            {
                return BadRequest();
            }

            ctx.Orders.Add(order);
            ctx.SaveChanges();

            return CreatedAtRoute("GetOrder", new { id = order.Id }, order);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Order order)
        {
            if (order == null || order.Id != id)
            {
                return BadRequest();
            }

            var updatedOrder = ctx.Orders.FirstOrDefault(c => c.Id == id);

            if (updatedOrder == null)
            {
                return NotFound();
            }

            updatedOrder.Customer = order.Customer;
            updatedOrder.Completed = order.Completed;
            updatedOrder.Total = order.Total;
            updatedOrder.Placed = order.Placed;

            ctx.SaveChanges();
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var order = ctx.Orders.FirstOrDefault(t => t.Id == id);
            if (order == null)
            {
                return NotFound();
            }

            ctx.Orders.Remove(order);
            ctx.SaveChanges();
            return new NoContentResult();
        }
    }
}