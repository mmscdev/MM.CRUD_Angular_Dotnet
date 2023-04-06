﻿using Microsoft.EntityFrameworkCore;
using MM.WebApi.Models;

namespace MM.WebApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {

        }
        public DbSet<Evento> Eventos { get; set; } 
    }
}
