using Microsoft.EntityFrameworkCore;
namespace ghost_bi_backend.Models
{
    public class BiDbContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Server> Servers { get; set; }
        public BiDbContext(DbContextOptions<BiDbContext> options) : base(options) { }
    }
}