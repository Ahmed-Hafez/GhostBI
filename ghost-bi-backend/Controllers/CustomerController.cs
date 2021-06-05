using System;
using System.Linq;
using ghost_bi_backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace ghost_bi_backend.Controllers
{
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private readonly BiDbContext ctx;

        public CustomerController(BiDbContext ctx)
        {
            this.ctx = ctx;
        }

        // GET api/customer/pageNumber/pageSize
        [HttpGet("{pageIndex:int}/{pageSize:int}")]
        public IActionResult Get(int pageIndex, int pageSize)
        {
            var data = ctx.Customers.OrderBy(c => c.Id);
            var page = new PaginatedResponse<Customer>(data, pageIndex, pageSize);

            var totalCount = data.Count();
            var totalPages = Math.Ceiling((double)totalCount / pageSize);

            var response = new
            {
                Page = page,
                TotalPages = totalPages
            };

            return Ok(response);
        }

        [HttpGet("{id}", Name = "GetCustomer")]
        public Customer Get(int id)
        {
            return ctx.Customers.Find(id);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Customer customer)
        {
            if (customer == null)
            {
                return BadRequest();
            }

            ctx.Customers.Add(customer);
            ctx.SaveChanges();

            return CreatedAtRoute("GetCustomer", new { id = customer.Id }, customer);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Customer customer)
        {
            if (customer == null || customer.Id != id)
            {
                return BadRequest();
            }

            var updatedCustomer = ctx.Customers.FirstOrDefault(c => c.Id == id);

            if (updatedCustomer == null)
            {
                return NotFound();
            }

            updatedCustomer.Email = customer.Email;
            updatedCustomer.Name = customer.Name;
            updatedCustomer.State = customer.State;

            ctx.SaveChanges();
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var customer = ctx.Customers.FirstOrDefault(t => t.Id == id);
            if (customer == null)
            {
                return NotFound();
            }

            ctx.Customers.Remove(customer);
            ctx.SaveChanges();
            return new NoContentResult();
        }
    }
}