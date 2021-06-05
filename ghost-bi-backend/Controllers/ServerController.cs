using ghost_bi_backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace ghost_bi_backend.Controllers
{
    [Route("api/[controller]")]
    public class ServerController : Controller
    {
        private readonly BiDbContext ctx;

        public ServerController(BiDbContext ctx)
        {
            this.ctx = ctx;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var response = ctx.Servers.OrderBy(s=>s.Id).ToList(); 
            return Ok(response);
        }

        [HttpGet("{id}", Name ="GetServer")]
        public Server Get(int id)
        {
            return ctx.Servers.Find(id);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Server server)
        {
            if (server == null)
            {
                return BadRequest();
            }

            ctx.Servers.Add(server);
            ctx.SaveChanges();

            return CreatedAtRoute("GetServer", new { id = server.Id }, server);
        }

        [HttpPut("{id}")]
        public IActionResult Message(int id, [FromBody] ServerMessage msg)
        {

            var server = ctx.Servers.FirstOrDefault(s => s.Id == id);

            if (server == null)
            {
                return NotFound();
            }

            if(msg.Payload == "activate")
            {
                server.IsOnline = true;
                ctx.SaveChanges();
            }

            if(msg.Payload == "deactivate")
            {
                server.IsOnline = false;
                ctx.SaveChanges();
            }

            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var server = ctx.Servers.FirstOrDefault(t => t.Id == id);
            if (server == null)
            {
                return NotFound();
            }

            ctx.Servers.Remove(server);
            ctx.SaveChanges();
            return new NoContentResult();
        }
    }
}