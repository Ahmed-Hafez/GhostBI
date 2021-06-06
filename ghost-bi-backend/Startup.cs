using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ghost_bi_backend.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

namespace ghost_bi_backend
{
    public class Startup
    {
        private string connectionString;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", c => c.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });
            this.connectionString = Configuration["secretConnectionString"];
            services.AddControllers();

            services.AddEntityFrameworkNpgsql()
                    .AddDbContext<BiDbContext>(opt => opt.UseNpgsql(connectionString));
            
            services.AddTransient<DataSeed>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataSeed seed)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            seed.SeedData(20, 1000);
        }
    }
}
